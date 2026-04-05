# Database Schema

```mermaid
erDiagram
    User {
        ObjectID id PK
        string battle_net_id UK
        string battle_tag
        string region
        string access_token
        string refresh_token
        datetime token_expiry
        datetime created_at
        datetime updated_at
    }

    Team {
        ObjectID id PK
        string name
        string slug UK
        string rank
        int wins
        int losses
        int draws
        datetime created_at
        datetime updated_at
    }

    TeamMembership {
        ObjectID id PK
        ObjectID team_id FK
        ObjectID user_id FK "null if unregistered"
        string role "owner | manager | coach | player"
        string name "display name if unregistered"
        string hero "players only"
        datetime joined_at
    }

    Invite {
        ObjectID id PK
        ObjectID team_id FK
        ObjectID invited_by FK
        ObjectID user_id FK "null until accepted"
        string battle_tag
        string role "owner | manager | coach | player"
        string status "pending | accepted | declined | expired"
        datetime expires_at
        datetime created_at
    }

    WeeklyScheduleBlock {
        ObjectID id PK
        ObjectID team_id FK
        int day_of_week "0=Sun…6=Sat"
        string event_type "scrim | match | coaching"
        string start_time
        string end_time
        string timezone
        datetime active_from
        datetime active_until "null = current"
    }

    ScheduleException {
        ObjectID id PK
        ObjectID team_id FK
        date date
        string type "cancelled | rescheduled | extra"
        string start_time
        string end_time
        string note
    }

    Match {
        ObjectID id PK
        ObjectID team_id FK
        string opponent_name
        datetime date
        datetime created_at
    }

    MapResult {
        ObjectID id PK
        ObjectID match_id FK
        string map
        string team1_ban
        string team2_ban
        int team1_score
        int team2_score
    }

    User ||--o{ TeamMembership : "has"
    Team ||--o{ TeamMembership : "has"
    Team ||--o{ Invite : "sends"
    User ||--o{ Invite : "receives"
    Team ||--o{ WeeklyScheduleBlock : "has"
    Team ||--o{ ScheduleException : "has"
    Team ||--o{ Match : "plays"
    Match ||--o{ MapResult : "contains"
```

## Notes

- `TeamMembership` is a junction between `User` and `Team`. `role` covers all relationships: `owner` (created the team), `manager`/`coach` (staff), `player` (roster). A user can have multiple memberships across teams.
- `user_id` on `TeamMembership` is nullable — unregistered players can be added by name, and linked to a `User` account later.
- `hero` is player-specific and left empty for non-player roles.
- `Invite.user_id` is null until the invite is accepted — matched to a `User` when they log in with the invited BattleTag. Accepting an invite creates a `TeamMembership` row.
- `MapResult` is an embedded array in MongoDB, not a separate collection — it is never queried independently of its match.
- `WeeklyScheduleBlock` is versioned via `active_from`/`active_until`. To change the schedule, close the old block and insert a new one — never mutate existing rows.
- `ScheduleException` overrides a specific date: `cancelled` removes that day's block, `rescheduled` replaces the time, `extra` adds a one-off session with no corresponding weekly slot.
- `wins`/`losses`/`draws` on `Team` are denormalized — update them when a match is saved to avoid scanning all matches on every render.
- `opponent_name` on `Match` is a plain string. Opponents are not required to be registered users in the system.
