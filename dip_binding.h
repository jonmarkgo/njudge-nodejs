#ifndef DIP_BINDING_H
#define DIP_BINDING_H

#include <node.h>
#include <string>
#include <vector>

namespace diplomacy {

// Initialize the configuration
void InitConfig(const v8::FunctionCallbackInfo<v8::Value>& args);

// Game setup functions
void InitGame(const v8::FunctionCallbackInfo<v8::Value>& args);
void GetGameState(const v8::FunctionCallbackInfo<v8::Value>& args);
void ValidateOrder(const v8::FunctionCallbackInfo<v8::Value>& args);
void ProcessOrders(const v8::FunctionCallbackInfo<v8::Value>& args);

// Game configuration functions
void SetGameVariant(const v8::FunctionCallbackInfo<v8::Value>& args);
void SetPressRules(const v8::FunctionCallbackInfo<v8::Value>& args);
void SetDeadlines(const v8::FunctionCallbackInfo<v8::Value>& args);
void SetVictoryConditions(const v8::FunctionCallbackInfo<v8::Value>& args);
void SetGameAccess(const v8::FunctionCallbackInfo<v8::Value>& args);

// Player interaction functions
void RegisterPlayer(const v8::FunctionCallbackInfo<v8::Value>& args);
void GetPlayerStatus(const v8::FunctionCallbackInfo<v8::Value>& args);
void SendPress(const v8::FunctionCallbackInfo<v8::Value>& args);
void VoteForDraw(const v8::FunctionCallbackInfo<v8::Value>& args);
void SubmitOrders(const v8::FunctionCallbackInfo<v8::Value>& args);

// Game administration functions
void CreateGame(const v8::FunctionCallbackInfo<v8::Value>& args);
void ListGames(const v8::FunctionCallbackInfo<v8::Value>& args);
void GetGameDetails(const v8::FunctionCallbackInfo<v8::Value>& args);
void ModifyGameSettings(const v8::FunctionCallbackInfo<v8::Value>& args);
void SetMaster(const v8::FunctionCallbackInfo<v8::Value>& args);
void BackupGame(const v8::FunctionCallbackInfo<v8::Value>& args);
void RestoreGame(const v8::FunctionCallbackInfo<v8::Value>& args);

// Player account management functions
void LinkPlayerEmail(const v8::FunctionCallbackInfo<v8::Value>& args);
void SetPlayerPreferences(const v8::FunctionCallbackInfo<v8::Value>& args);

// Email and text processing functions
void ProcessTextInput(const v8::FunctionCallbackInfo<v8::Value>& args);
void GetTextOutput(const v8::FunctionCallbackInfo<v8::Value>& args);
void SimulateInboundEmail(const v8::FunctionCallbackInfo<v8::Value>& args);
void GetOutboundEmails(const v8::FunctionCallbackInfo<v8::Value>& args);

// Advanced diplomacy features
void ProcessConditionalOrders(const v8::FunctionCallbackInfo<v8::Value>& args);
void ExtendedPressRules(const v8::FunctionCallbackInfo<v8::Value>& args);

// Module initialization
void Init(v8::Local<v8::Object> exports);

}  // namespace diplomacy

#endif // DIP_BINDING_H