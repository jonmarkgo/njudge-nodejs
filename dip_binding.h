#ifndef DIP_BINDING_H
#define DIP_BINDING_H

// Force GCC 4 ABI compatibility
#if __GNUC__ > 4
#define _GLIBCXX_USE_CXX11_ABI 0
#endif

#include <napi.h>

// Forward declarations of C functions
extern "C" {
    #include "../dip.h"
    #include "../porder.h"
    #include "../conf.h"
    
    int po_init();
    int gamein();
    void process_input(int userid, const char* input, int from);
    void process_output(int userid, const char* phase);
    int getuser(const char* email, char* password, char* address, char* site);
    int move_syntaxcheck(char* order, int check, void* unused);
    int retreat_syntaxcheck(char* order, int check, void* unused);
    int build_syntaxcheck(char* order, int check, void* unused);
    int get_player_output(int playerId, char* buffer, size_t bufferSize);
    
    // Reference to CONFIG_FILE from conf.h
    extern char* CONFIG_FILE;
}

// Undefine conflicting macros
#ifdef min
#undef min
#endif
#ifdef max
#undef max
#endif

// Game state management
Napi::Value InitGame(const Napi::CallbackInfo& info);
Napi::Value LoadGame(const Napi::CallbackInfo& info);
Napi::Value SaveGame(const Napi::CallbackInfo& info);

// Order processing
Napi::Value ProcessOrders(const Napi::CallbackInfo& info);
Napi::Value ValidateOrder(const Napi::CallbackInfo& info);
Napi::Value GetValidMoves(const Napi::CallbackInfo& info);

// Game queries
Napi::Value GetGameState(const Napi::CallbackInfo& info);
Napi::Value GetProvinceState(const Napi::CallbackInfo& info);

// Player registration and management
Napi::Value RegisterPlayer(const Napi::CallbackInfo& info);
Napi::Value LinkPlayerEmail(const Napi::CallbackInfo& info);
Napi::Value GetPlayerInfo(const Napi::CallbackInfo& info);
Napi::Value UpdatePlayerInfo(const Napi::CallbackInfo& info);

// Game settings
Napi::Value SetGameVariant(const Napi::CallbackInfo& info);
Napi::Value SetPlayerCount(const Napi::CallbackInfo& info);
Napi::Value SetPressRules(const Napi::CallbackInfo& info);
Napi::Value SetDeadlines(const Napi::CallbackInfo& info);
Napi::Value SetVictoryConditions(const Napi::CallbackInfo& info);
Napi::Value SetGameAccess(const Napi::CallbackInfo& info);

// Text input/output handling
Napi::Value ProcessTextInput(const Napi::CallbackInfo& info);
Napi::Value GetTextOutput(const Napi::CallbackInfo& info);
Napi::Value SimulateInboundEmail(const Napi::CallbackInfo& info);
Napi::Value GetOutboundEmails(const Napi::CallbackInfo& info);

// Module initialization
Napi::Object Init(Napi::Env env, Napi::Object exports);

#endif // DIP_BINDING_H 