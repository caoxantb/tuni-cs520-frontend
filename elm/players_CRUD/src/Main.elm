module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }

getNewPlayerId : List Player -> Int
getNewPlayerId players = 
    let 
      lastPlayer = List.head (List.reverse players)
    in
      case lastPlayer of
          Just player -> player.id + 1
          Nothing -> 1
          

update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
          let 
            {newPlayer} = model
            updatedPlayer = {newPlayer | name = name}
          in
            {model | newPlayer = updatedPlayer}
        
        AddPlayer ->
          let
            {newPlayer, players} = model
            playerId = getNewPlayerId players
            addedPlayer = {newPlayer | id = playerId }
          in 
            {model | players = players ++ [addedPlayer], newPlayer = initPlayer (playerId + 1)}

        DeletePlayer id ->
          let
            {players} = model
          in
            {model | players = List.filter (\player -> player.id /= id) players}

        ModifyPlayer id status ->
          let
            {players} = model
          in
            {model | players = List.map (\player -> if player.id == id then {player | isActive = status} else player) players}
          

view : Model -> Html Msg
view model =
    div [] 
        [h1 [] [ text "Elm Exercise: Players CRUD" ]
        , Html.form 
          [id "submit-player", onSubmit AddPlayer]
          [input [ id "input-player", type_ "text", placeholder "Enter player name", value model.newPlayer.name, onInput SetName ] []
          , button [ id "btn-add", type_ "submit" ] [ text "Add Player" ]
          ]
        , ol [ id "players-list" ] (List.map playerList model.players)
        ]
    
playerList : Player -> Html Msg
playerList player = 
    li 
      [id <| "player-" ++ String.fromInt player.id]
      [div [ class "player-name" ] [ text player.name ]
      , label [ class "player-status"]
        [input [ type_ "checkbox", class "player-status", checked player.isActive, onCheck <| ModifyPlayer player.id ] []
        , text (if player.isActive then "Active" else "Inactive")
        , span [ class "checkmark" ] []
        ]
      , button [ class "btn-delete", onClick <| DeletePlayer player.id ] [ text "Delete" ]
      ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
