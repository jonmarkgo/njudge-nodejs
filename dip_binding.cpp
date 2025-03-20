#include <node.h>
#include <string>
#include <vector>
#include <map>
#include <random>
#include <iostream>
#include "dip_binding.h"

namespace diplomacy {

// Helper structs
struct Player {
  std::string power;
  int status;
  int units;
  int centers;
};

struct GameDetails {
  std::string id;
  std::string name;
  std::string description;
  std::string variant;
  std::string phase;
  std::string press;
  int deadline;
  int graceTime;
  std::string victoryConditions;
  std::string startTime;
  std::vector<Player> players;
};

// Game state
std::string currentPhase = "DIPLOMACY";
std::string currentSeason = "SPRING";
int currentYear = 1901;
std::vector<Player> players;

// Game storage
std::map<std::string, GameDetails> games;

// Utilities for generating IDs
std::string generateId(int length = 8) {
  static const char alphanum[] =
    "0123456789"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz";
  
  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> dis(0, sizeof(alphanum) - 2);
  
  std::string id;
  for (int i = 0; i < length; ++i) {
    id += alphanum[dis(gen)];
  }
  
  return id;
}

// Use v8 namespace for cleaner code
using v8::FunctionCallbackInfo;
using v8::Value;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Number;
using v8::Array;
using v8::Boolean;
using v8::Context;
using v8::Exception;

// Initialize the configuration
void InitConfig(const FunctionCallbackInfo<Value>& args) {
  // Reset any global state if needed
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

// Game setup functions
void InitGame(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  // Reset game state
  currentPhase = "DIPLOMACY";
  currentSeason = "SPRING";
  currentYear = 1901;
  players.clear();
  
  // Add empty players based on the count
  if (args.Length() >= 2) {
    int playerCount = args[1]->Int32Value(isolate->GetCurrentContext()).FromJust();
    
    for (int i = 0; i < playerCount; ++i) {
      std::string power = "Power " + std::to_string(i+1);
      players.push_back({power, 0, 3, 3});
    }
  }
  
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

void GetGameState(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  // Create game state object
  Local<Object> state = Object::New(isolate);
  state->Set(context, String::NewFromUtf8(isolate, "phase").ToLocalChecked(), 
             String::NewFromUtf8(isolate, currentPhase.c_str()).ToLocalChecked()).Check();
  state->Set(context, String::NewFromUtf8(isolate, "season").ToLocalChecked(), 
             String::NewFromUtf8(isolate, currentSeason.c_str()).ToLocalChecked()).Check();
  state->Set(context, String::NewFromUtf8(isolate, "year").ToLocalChecked(), 
             Number::New(isolate, currentYear)).Check();
  
  // Add players array
  Local<Array> playerArray = Array::New(isolate, players.size());
  for (size_t i = 0; i < players.size(); ++i) {
    Local<Object> player = Object::New(isolate);
    player->Set(context, String::NewFromUtf8(isolate, "power").ToLocalChecked(), 
                String::NewFromUtf8(isolate, players[i].power.c_str()).ToLocalChecked()).Check();
    player->Set(context, String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                Number::New(isolate, players[i].status)).Check();
    player->Set(context, String::NewFromUtf8(isolate, "units").ToLocalChecked(),
                Number::New(isolate, players[i].units)).Check();
    player->Set(context, String::NewFromUtf8(isolate, "centers").ToLocalChecked(),
                Number::New(isolate, players[i].centers)).Check();
    
    playerArray->Set(context, i, player).Check();
  }
  state->Set(context, String::NewFromUtf8(isolate, "players").ToLocalChecked(), playerArray).Check();
  
  args.GetReturnValue().Set(state);
}

void ValidateOrder(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  // Validate if an order is syntactically correct (for demo, return true for any order)
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

void ProcessOrders(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  // Process given orders and return success
  args.GetReturnValue().Set(Number::New(isolate, 1));
}

// Game configuration functions
void SetGameVariant(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

void SetPressRules(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

void SetDeadlines(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

void SetVictoryConditions(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

void SetGameAccess(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(Boolean::New(isolate, true));
}

// Player interaction functions
void RegisterPlayer(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  result->Set(context, String::NewFromUtf8(isolate, "playerId").ToLocalChecked(), 
              Number::New(isolate, 123)).Check();
  
  args.GetReturnValue().Set(result);
}

void GetPlayerStatus(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> status = Object::New(isolate);
  status->Set(context, String::NewFromUtf8(isolate, "power").ToLocalChecked(), 
              String::NewFromUtf8(isolate, "FRANCE").ToLocalChecked()).Check();
  status->Set(context, String::NewFromUtf8(isolate, "status").ToLocalChecked(), 
              String::NewFromUtf8(isolate, "ACTIVE").ToLocalChecked()).Check();
  status->Set(context, String::NewFromUtf8(isolate, "units").ToLocalChecked(), 
              Number::New(isolate, 3)).Check();
  status->Set(context, String::NewFromUtf8(isolate, "centers").ToLocalChecked(), 
              Number::New(isolate, 3)).Check();
  
  args.GetReturnValue().Set(status);
}

void SendPress(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  
  args.GetReturnValue().Set(result);
}

void VoteForDraw(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  
  args.GetReturnValue().Set(result);
}

void SubmitOrders(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  result->Set(context, String::NewFromUtf8(isolate, "ordersAccepted").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  
  args.GetReturnValue().Set(result);
}

// Game administration functions
void CreateGame(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  std::string gameId = generateId();
  
  // Store game in our map (for the demo)
  games[gameId] = {
    gameId,
    "New Game",
    "Description",
    "standard",
    "DIPLOMACY",
    "grey",
    24,
    12,
    "Standard",
    "2023-01-01",
    {}
  };
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  result->Set(context, String::NewFromUtf8(isolate, "gameId").ToLocalChecked(), 
              String::NewFromUtf8(isolate, gameId.c_str()).ToLocalChecked()).Check();
  
  args.GetReturnValue().Set(result);
}

void ListGames(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Array> gameList = Array::New(isolate, games.size());
  
  int i = 0;
  for (const auto& pair : games) {
    const GameDetails& game = pair.second;
    
    Local<Object> gameObj = Object::New(isolate);
    gameObj->Set(context, String::NewFromUtf8(isolate, "id").ToLocalChecked(), 
                 String::NewFromUtf8(isolate, game.id.c_str()).ToLocalChecked()).Check();
    gameObj->Set(context, String::NewFromUtf8(isolate, "name").ToLocalChecked(), 
                 String::NewFromUtf8(isolate, game.name.c_str()).ToLocalChecked()).Check();
    gameObj->Set(context, String::NewFromUtf8(isolate, "phase").ToLocalChecked(), 
                 String::NewFromUtf8(isolate, game.phase.c_str()).ToLocalChecked()).Check();
    gameObj->Set(context, String::NewFromUtf8(isolate, "players").ToLocalChecked(), 
                 Number::New(isolate, game.players.size())).Check();
    
    gameList->Set(context, i++, gameObj).Check();
  }
  
  args.GetReturnValue().Set(gameList);
}

void GetGameDetails(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  // Demo data
  Local<Object> details = Object::New(isolate);
  details->Set(context, String::NewFromUtf8(isolate, "id").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "game123").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "name").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "Test Game").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "variant").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "standard").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "phase").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "DIPLOMACY").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "press").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "grey").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "deadline").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "24h").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "graceTime").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "12h").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "victoryConditions").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "Standard").ToLocalChecked()).Check();
  details->Set(context, String::NewFromUtf8(isolate, "startTime").ToLocalChecked(), 
               String::NewFromUtf8(isolate, "2023-01-01").ToLocalChecked()).Check();
  
  Local<Array> playerList = Array::New(isolate, 7);
  const char* powers[] = {"ENGLAND", "FRANCE", "GERMANY", "ITALY", "AUSTRIA", "RUSSIA", "TURKEY"};
  
  for (int i = 0; i < 7; ++i) {
    Local<Object> player = Object::New(isolate);
    player->Set(context, String::NewFromUtf8(isolate, "power").ToLocalChecked(), 
                String::NewFromUtf8(isolate, powers[i]).ToLocalChecked()).Check();
    player->Set(context, String::NewFromUtf8(isolate, "status").ToLocalChecked(), 
                String::NewFromUtf8(isolate, "ACTIVE").ToLocalChecked()).Check();
    player->Set(context, String::NewFromUtf8(isolate, "player").ToLocalChecked(), 
                String::NewFromUtf8(isolate, ("Player " + std::to_string(i+1)).c_str()).ToLocalChecked()).Check();
    
    playerList->Set(context, i, player).Check();
  }
  
  details->Set(context, String::NewFromUtf8(isolate, "players").ToLocalChecked(), playerList).Check();
  
  args.GetReturnValue().Set(details);
}

void ModifyGameSettings(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  
  args.GetReturnValue().Set(result);
}

void SetMaster(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  
  args.GetReturnValue().Set(result);
}

void BackupGame(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  result->Set(context, String::NewFromUtf8(isolate, "file").ToLocalChecked(), 
              String::NewFromUtf8(isolate, "backup-123.json").ToLocalChecked()).Check();
  
  args.GetReturnValue().Set(result);
}

void RestoreGame(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  
  Local<Object> result = Object::New(isolate);
  result->Set(context, String::NewFromUtf8(isolate, "success").ToLocalChecked(), 
              Boolean::New(isolate, true)).Check();
  result->Set(context, String::NewFromUtf8(isolate, "gameId").ToLocalChecked(), 
              String::NewFromUtf8(isolate, "restored-game-123").ToLocalChecked()).Check();
  
  args.GetReturnValue().Set(result);
}

// Module initialization
void Init(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "initConfig", InitConfig);
  NODE_SET_METHOD(exports, "initGame", InitGame);
  NODE_SET_METHOD(exports, "getGameState", GetGameState);
  NODE_SET_METHOD(exports, "validateOrder", ValidateOrder);
  NODE_SET_METHOD(exports, "processOrders", ProcessOrders);

  NODE_SET_METHOD(exports, "setGameVariant", SetGameVariant);
  NODE_SET_METHOD(exports, "setPressRules", SetPressRules);
  NODE_SET_METHOD(exports, "setDeadlines", SetDeadlines);
  NODE_SET_METHOD(exports, "setVictoryConditions", SetVictoryConditions);
  NODE_SET_METHOD(exports, "setGameAccess", SetGameAccess);

  NODE_SET_METHOD(exports, "registerPlayer", RegisterPlayer);
  NODE_SET_METHOD(exports, "getPlayerStatus", GetPlayerStatus);
  NODE_SET_METHOD(exports, "sendPress", SendPress);
  NODE_SET_METHOD(exports, "voteForDraw", VoteForDraw);
  NODE_SET_METHOD(exports, "submitOrders", SubmitOrders);

  NODE_SET_METHOD(exports, "createGame", CreateGame);
  NODE_SET_METHOD(exports, "listGames", ListGames);
  NODE_SET_METHOD(exports, "getGameDetails", GetGameDetails);
  NODE_SET_METHOD(exports, "modifyGameSettings", ModifyGameSettings);
  NODE_SET_METHOD(exports, "setMaster", SetMaster);
  NODE_SET_METHOD(exports, "backupGame", BackupGame);
  NODE_SET_METHOD(exports, "restoreGame", RestoreGame);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace diplomacy 