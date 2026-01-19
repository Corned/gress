package db

import "time"

type ScrimBlock struct {
	Team1 string `bson:"team1"`
	Team2 string `bson:"team2"`
	Date time.Time `bson:"date"`
	Entries []Entry `bson:"entries"`
}
	
// Change mapName and bans to use ids
type Entry struct {
	mapName string `bson:"mapName"`
	team1Ban string `bson:"team1Ban"`
	team2Ban string `bson:"team2Ban"`
	team1Score int `bson:"team1Score"`
	team2Score int `bson:"team2Score"`
	code string `bson:"code"`
	winningTeam int `bson:"winningTeam"`
}