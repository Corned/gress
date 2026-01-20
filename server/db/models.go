package db

import "time"

type ScrimBlock struct {
	Team1 string `bson:"team1"`
	Team2 string `bson:"team2"`
	Date time.Time `bson:"date"`
	Entries []Entry `bson:"entries"`
}
	
// TODO: Change mapName and bans to use ids
type Entry struct {
	MapName string `bson:"mapName"`
	Team1Ban string `bson:"team1Ban"`
	Team2Ban string `bson:"team2Ban"`
	Team1Score int `bson:"team1Score"`
	Team2Score int `bson:"team2Score"`
	Code string `bson:"code"`
	WinningTeam int `bson:"winningTeam"`
}