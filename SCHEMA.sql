CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    battle_net_id TEXT UNIQUE NOT NULL,
    battle_tag    TEXT NOT NULL,
    region        TEXT NOT NULL,
    access_token  TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    token_expiry  TIMESTAMPTZ NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE teams (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       TEXT NOT NULL,
    slug       TEXT UNIQUE NOT NULL,
    rank       TEXT NOT NULL,
    wins       INT NOT NULL DEFAULT 0,
    losses     INT NOT NULL DEFAULT 0,
    draws      INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE team_memberships (
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id   UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id   UUID REFERENCES users(id) ON DELETE SET NULL,
    role      TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'coach', 'player')),
    name      TEXT,
    hero      TEXT,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (team_id, user_id)
);

CREATE TABLE invites (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id    UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    invited_by UUID NOT NULL REFERENCES users(id),
    user_id    UUID REFERENCES users(id),
    battle_tag TEXT NOT NULL,
    role       TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'coach', 'player')),
    status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE weekly_schedule_blocks (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id      UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    day_of_week  INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    event_type   TEXT NOT NULL CHECK (event_type IN ('scrim', 'match', 'coaching')),
    start_time   TIME NOT NULL,
    end_time     TIME NOT NULL,
    timezone     TEXT NOT NULL,
    active_from  DATE NOT NULL,
    active_until DATE
);

CREATE TABLE schedule_exceptions (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id    UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    date       DATE NOT NULL,
    type       TEXT NOT NULL CHECK (type IN ('cancelled', 'rescheduled', 'extra')),
    start_time TIME,
    end_time   TIME,
    note       TEXT
);

CREATE TABLE matches (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id       UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    opponent_name TEXT NOT NULL,
    date          TIMESTAMPTZ NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE map_results (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id    UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    map         TEXT NOT NULL,
    team1_ban   TEXT NOT NULL,
    team2_ban   TEXT NOT NULL,
    team1_score INT NOT NULL,
    team2_score INT NOT NULL
);

-- Indexes
CREATE INDEX ON team_memberships (team_id);
CREATE INDEX ON team_memberships (user_id);
CREATE INDEX ON invites (team_id, status);
CREATE INDEX ON weekly_schedule_blocks (team_id, active_until);
CREATE INDEX ON schedule_exceptions (team_id, date);
CREATE INDEX ON matches (team_id);
CREATE INDEX ON map_results (match_id);
