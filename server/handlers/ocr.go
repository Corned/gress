package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type ocrRequest struct {
	Image     string `json:"image"`     // base64-encoded image data
	MediaType string `json:"mediaType"` // e.g. "image/png"
}

type claudeRequest struct {
	Model     string          `json:"model"`
	MaxTokens int             `json:"max_tokens"`
	Messages  []claudeMessage `json:"messages"`
}

type claudeMessage struct {
	Role    string         `json:"role"`
	Content []claudeContent `json:"content"`
}

type claudeContent struct {
	Type   string        `json:"type"`
	Text   string        `json:"text,omitempty"`
	Source *claudeSource `json:"source,omitempty"`
}

type claudeSource struct {
	Type      string `json:"type"`
	MediaType string `json:"media_type"`
	Data      string `json:"data"`
}

type claudeResponse struct {
	Content []struct {
		Type string `json:"type"`
		Text string `json:"text"`
	} `json:"content"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error"`
}

func OCR(c *gin.Context) {
	var req ocrRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	if req.Image == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "image is required"})
		return
	}

	mediaType := req.MediaType
	if mediaType == "" {
		mediaType = "image/png"
	}

	payload := claudeRequest{
		Model:     "claude-haiku-4-5-20251001",
		MaxTokens: 1024,
		Messages: []claudeMessage{
			{
				Role: "user",
				Content: []claudeContent{
					{
						Type: "image",
						Source: &claudeSource{
							Type:      "base64",
							MediaType: mediaType,
							Data:      req.Image,
						},
					},
					{
						Type: "text",
						Text: "This is an Overwatch 2 match history screenshot. Extract each match as a row with these fields only: map name, replay code, result (WIN/LOSS/DRAW), and score (e.g. 3-1). Ignore the game mode label and timestamps. Return as plain lines, one match per line, in this format: MAP | CODE | RESULT | SCORE",
					},
				},
			},
		},
	}

	body, err := json.Marshal(payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to build request"})
		return
	}

	httpReq, err := http.NewRequest("POST", "https://api.anthropic.com/v1/messages", bytes.NewReader(body))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create request"})
		return
	}
	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("x-api-key", os.Getenv("ANTHROPIC_API_KEY"))
	httpReq.Header.Set("anthropic-version", "2023-06-01")

	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "failed to reach Claude API"})
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	var claudeResp claudeResponse
	if err := json.Unmarshal(respBody, &claudeResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse Claude response"})
		return
	}

	if claudeResp.Error != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": claudeResp.Error.Message})
		return
	}

	text := ""
	for _, block := range claudeResp.Content {
		if block.Type == "text" {
			text += block.Text
		}
	}

	if text == "" {
		c.JSON(http.StatusOK, gin.H{"text": fmt.Sprintf("(raw) %s", string(respBody))})
		return
	}

	c.JSON(http.StatusOK, gin.H{"text": text})
}
