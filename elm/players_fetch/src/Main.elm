-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =     
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list

getNewPlayerId : List Player -> Int
getNewPlayerId players = 
    let 
      lastPlayer = List.head (List.reverse players)
    in
      case lastPlayer of
          Just player -> player.id + 1
          Nothing -> 1


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { 
        players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
    }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName word ->
          let 
            {newPlayer} = model
            updatedPlayer = {newPlayer | name = word}
          in
            ({model | newPlayer = updatedPlayer}, Cmd.none)

        AddPlayer ->
          let
            {newPlayer, players} = model
            playerId = getNewPlayerId players
            addedPlayer = {newPlayer | id = playerId }
          in 
            ({model | players = players ++ [addedPlayer], newPlayer = initPlayer (playerId + 1)}, Cmd.none)

        DeletePlayer id ->
          let
            {players} = model
          in
            ({model | players = List.filter (\player -> player.id /= id) players}, Cmd.none)

        ModifyPlayer id status ->
          let
            {players} = model
          in
            ({model | players = List.map (\player -> if player.id == id then {player | isActive = status} else player) players}, Cmd.none)

        FetchPlayers data ->
            case data of 
              Ok fetchedPlayers -> 
                ({model | players = fetchedPlayers, reqStatus = ""}, Cmd.none)
              Err _ ->
                ({ model | reqStatus = "An error has occurred!!!" }, Cmd.none)

view : Model -> Html Msg
view model =
    div [] 
        [h1 [] [ text "Elm Exercise: Players Fetch" ]
        , Html.form 
          [id "submit-player", onSubmit AddPlayer]
          [input [ id "input-player", type_ "text", placeholder "Enter player name", value model.newPlayer.name, onInput SetName ] []
          , button [ id "btn-add", type_ "submit" ] [ text "Add Player" ]
          ]
        , ol [ id "players-list" ] (List.map playerList model.players)
        , div [ id "request-status" ] [ text model.reqStatus ]
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
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
