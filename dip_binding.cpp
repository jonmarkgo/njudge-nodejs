#include "dip_binding.h"
#include <string>
#include <vector>
#include <sstream>

// Helper function to process orders without email
static int ProcessOrdersInternal(const std::string& orders, int player_id) {
    // Initialize game state if needed
    if (po_init() || gamein()) {
        return -1;  // E_FATAL
    }

    // Process the orders
    process_input(player_id, orders.c_str(), player_id);
    
    // Get output
    process_output(player_id, dipent.phase);

    return 0;  // Success
}

// Register a new player
Napi::Value RegisterPlayer(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1 || !info[0].IsObject()) {
        Napi::TypeError::New(env, "Object argument expected")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Object player = info[0].As<Napi::Object>();
    
    // Required fields
    std::string name = player.Get("name").As<Napi::String>().Utf8Value();
    std::string email = player.Get("email").As<Napi::String>().Utf8Value();
    std::string level = player.Get("level").As<Napi::String>().Utf8Value();
    std::string address = player.Get("address").As<Napi::String>().Utf8Value();
    std::string country = player.Get("country").As<Napi::String>().Utf8Value();
    
    // Optional fields
    std::string phone = player.Has("phone") ? 
        player.Get("phone").As<Napi::String>().Utf8Value() : "";
    std::string site = player.Has("site") ? 
        player.Get("site").As<Napi::String>().Utf8Value() : "";
    
    // Validate required fields
    if (name.empty() || email.empty() || level.empty() || 
        address.empty() || country.empty()) {
        Napi::Error::New(env, "Missing required registration fields")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    // Create user record
    int userid = getuser(email.c_str(), NULL, NULL, NULL);
    if (userid > 0) {
        Napi::Error::New(env, "User already registered")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    // Store user info
    // TODO: Implement proper user storage mechanism
    
    return Napi::Boolean::New(env, true);
}

// Link additional email to existing player
Napi::Value LinkPlayerEmail(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string newEmail = info[0].As<Napi::String>().Utf8Value();
    std::string existingEmail = info[1].As<Napi::String>().Utf8Value();
    
    // Verify existing user
    int userid = getuser(existingEmail.c_str(), NULL, NULL, NULL);
    if (userid <= 0) {
        Napi::Error::New(env, "Original email not found")
            .ThrowAsJavaScriptException();
        return env.Null();
    }
    
    // TODO: Implement email linking mechanism
    
    return Napi::Boolean::New(env, true);
}

// Set game variant and initialize
Napi::Value SetGameVariant(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string variant = info[0].As<Napi::String>().Utf8Value();
    std::string gameId = info[1].As<Napi::String>().Utf8Value();
    
    // Set variant-specific flags
    if (variant == "standard") {
        dipent.flags &= ~F_MACH;  // Clear Machiavelli flag
    } else if (variant == "machiavelli") {
        dipent.flags |= F_MACH;   // Set Machiavelli flag
    }
    // TODO: Add other variants
    
    return Napi::Boolean::New(env, true);
}

// Set press rules
Napi::Value SetPressRules(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string pressType = info[0].As<Napi::String>().Utf8Value();
    std::string gameId = info[1].As<Napi::String>().Utf8Value();
    
    // Set press flags
    if (pressType == "none") {
        dipent.flags &= ~(F_DEFWHITE | F_GREY);  // Clear both flags
    } else if (pressType == "white") {
        dipent.flags |= F_DEFWHITE;              // Set white flag
        dipent.flags &= ~F_GREY;                 // Clear grey flag
    } else if (pressType == "grey") {
        dipent.flags |= F_GREY;                  // Set grey flag
        dipent.flags &= ~F_DEFWHITE;             // Clear white flag
    }
    
    return Napi::Boolean::New(env, true);
}

// Set deadlines and grace periods
Napi::Value SetDeadlines(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    int deadline = info[0].As<Napi::Number>().Int32Value();
    int grace = info[1].As<Napi::Number>().Int32Value();
    std::string gameId = info[2].As<Napi::String>().Utf8Value();
    
    // Set deadlines
    dipent.deadline = time(NULL) + (deadline * 60 * 60);  // Convert hours to seconds
    dipent.grace = time(NULL) + (grace * 60 * 60);
    
    return Napi::Boolean::New(env, true);
}

// Set victory conditions
Napi::Value SetVictoryConditions(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    bool dias = info[0].As<Napi::Boolean>();
    std::string gameId = info[1].As<Napi::String>().Utf8Value();
    
    // Set DIAS flag (using F_SPARE1 which was previously F_NODIAS)
    if (dias) {
        dipent.flags &= ~F_SPARE1;   // Clear F_SPARE1 flag (was F_NODIAS)
    } else {
        dipent.flags |= F_SPARE1;    // Set F_SPARE1 flag (was F_NODIAS)
    }
    
    return Napi::Boolean::New(env, true);
}

// Set game access restrictions
Napi::Value SetGameAccess(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 4) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    float dedication = info[0].As<Napi::Number>().FloatValue();
    float ontime = info[1].As<Napi::Number>().FloatValue();
    float resrat = info[2].As<Napi::Number>().FloatValue();
    std::string gameId = info[3].As<Napi::String>().Utf8Value();
    
    // Set access restrictions
    dipent.dedicate = static_cast<int>(dedication * 100);  // Convert to percentage
    dipent.orded = ontime;
    dipent.rrded = resrat;
    
    return Napi::Boolean::New(env, true);
}

// Initialize a new game
Napi::Value InitGame(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string variant = info[0].As<Napi::String>().Utf8Value();
    int num_players = info[1].As<Napi::Number>().Int32Value();

    // Initialize game state
    dipent.n = num_players;
    dipent.np = num_players;
    dipent.powers = num_players;
    dipent.valid = 1;
    dipent.pr_valid = 1;
    
    // TODO: Set up variant-specific initialization
    
    return Napi::Boolean::New(env, true);
}

// Process orders for a player
Napi::Value ProcessOrders(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string orders = info[0].As<Napi::String>().Utf8Value();
    int player_id = info[1].As<Napi::Number>().Int32Value();

    int result = ProcessOrdersInternal(orders, player_id);
    return Napi::Number::New(env, result);
}

// Validate an order
Napi::Value ValidateOrder(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string order = info[0].As<Napi::String>().Utf8Value();
    int player_id = info[1].As<Napi::Number>().Int32Value();
    
    // TODO: Implement order validation logic
    // For now, just return true
    return Napi::Boolean::New(env, true);
}

// Get current game state
Napi::Value GetGameState(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    // Create game state object
    Napi::Object state = Napi::Object::New(env);
    
    try {
        // Parse phase field (format: F1901M)
        std::string phase(dipent.phase);
        state.Set("phase", Napi::String::New(env, phase));
        
        // Extract season (F, S, W)
        std::string season = "Unknown";
        if (phase.length() > 0) {
            switch (phase[0]) {
                case 'F': season = "Fall"; break;
                case 'S': season = "Spring"; break;
                case 'W': season = "Winter"; break;
                default: season = "Unknown";
            }
        }
        state.Set("season", Napi::String::New(env, season));
        
        // Extract year (1901)
        int year = 1901;
        if (phase.length() >= 5) {
            try {
                std::string yearStr = phase.substr(1, 4);
                year = std::stoi(yearStr);
            } catch (...) {
                // Use default year if conversion fails
            }
        }
        state.Set("year", Napi::Number::New(env, year));
        
        // Create players array
        Napi::Array players = Napi::Array::New(env);
        const int MAX_PLAYERS = 20; // Reasonable limit for player count
        if (dipent.n > 0 && dipent.n <= MAX_PLAYERS) {
            for (int i = 0; i < dipent.n; i++) {
                Napi::Object player = Napi::Object::New(env);
                
                // Access player power safely
                const char* powerName = "Unknown";
                int power = dipent.players[i].power;
                if (power >= 0 && power < 20) { // Using reasonable limit for powers array
                    powerName = powers[power];
                }
                player.Set("power", Napi::String::New(env, powerName));
                
                player.Set("status", Napi::Number::New(env, dipent.players[i].status));
                player.Set("units", Napi::Number::New(env, dipent.players[i].units));
                player.Set("centers", Napi::Number::New(env, dipent.players[i].centers));
                players.Set(i, player);
            }
        }
        state.Set("players", players);
    }
    catch (const std::exception& e) {
        // In case of errors, return an error state
        state.Set("error", Napi::String::New(env, e.what()));
        state.Set("phase", Napi::String::New(env, "ERROR"));
        state.Set("year", Napi::Number::New(env, 0));
        state.Set("season", Napi::String::New(env, "Unknown"));
        state.Set("players", Napi::Array::New(env));
    }
    
    return state;
}

// Process text input
Napi::Value ProcessTextInput(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string text = info[0].As<Napi::String>().Utf8Value();
    std::string fromEmail = info[1].As<Napi::String>().Utf8Value();
    
    // TODO: Implement text input processing
    // For now, just return success
    return Napi::Boolean::New(env, true);
}

// Get text output
Napi::Value GetTextOutput(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    int player_id = info[0].As<Napi::Number>().Int32Value();
    
    // TODO: Implement text output generation
    // For now, just return empty string
    return Napi::String::New(env, "");
}

// Simulate inbound email
Napi::Value SimulateInboundEmail(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string subject = info[0].As<Napi::String>().Utf8Value();
    std::string body = info[1].As<Napi::String>().Utf8Value();
    std::string fromEmail = info[2].As<Napi::String>().Utf8Value();
    
    // TODO: Implement email simulation
    // For now, just return success
    return Napi::Boolean::New(env, true);
}

// Get outbound emails
Napi::Value GetOutboundEmails(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    // Create emails array
    Napi::Array emails = Napi::Array::New(env);
    // TODO: Fill in email information
    return emails;
}

// Get valid moves for a player
Napi::Value GetValidMoves(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    int player_id = info[0].As<Napi::Number>().Int32Value();
    
    // Initialize game state if needed
    if (po_init() || gamein()) {
        Napi::Error::New(env, "Failed to initialize game state")
            .ThrowAsJavaScriptException();
        return env.Null();
    }
    
    // TODO: Implement logic to get valid moves
    // For now, return an empty array
    Napi::Array moves = Napi::Array::New(env);
    return moves;
}

// Set the number of players in the game
Napi::Value SetPlayerCount(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    int num_players = info[0].As<Napi::Number>().Int32Value();
    std::string gameId = info[1].As<Napi::String>().Utf8Value();
    
    // Set player count
    dipent.n = num_players;
    dipent.np = num_players;
    dipent.powers = num_players;
    
    return Napi::Boolean::New(env, true);
}

// Load a game from file
Napi::Value LoadGame(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string gameId = info[0].As<Napi::String>().Utf8Value();
    
    // TODO: Implement game loading logic
    // For now, just return success
    return Napi::Boolean::New(env, true);
}

// Initialize the module
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    // Set CONFIG_FILE to point to the system's configuration file
    CONFIG_FILE = (char*)"/home/judge/dip.conf";
    
    // Initialize configuration system
    if (!conf_init()) {
        Napi::Error::New(env, "Failed to initialize configuration system")
            .ThrowAsJavaScriptException();
        return exports;
    }
    
    // We'll use the system's configuration values from dip.conf
    // instead of manually setting each value

    exports.Set("initGame", Napi::Function::New(env, InitGame));
    exports.Set("processOrders", Napi::Function::New(env, ProcessOrders));
    exports.Set("validateOrder", Napi::Function::New(env, ValidateOrder));
    exports.Set("getGameState", Napi::Function::New(env, GetGameState));
    exports.Set("registerPlayer", Napi::Function::New(env, RegisterPlayer));
    exports.Set("linkPlayerEmail", Napi::Function::New(env, LinkPlayerEmail));
    exports.Set("setGameVariant", Napi::Function::New(env, SetGameVariant));
    exports.Set("setPressRules", Napi::Function::New(env, SetPressRules));
    exports.Set("setDeadlines", Napi::Function::New(env, SetDeadlines));
    exports.Set("setVictoryConditions", Napi::Function::New(env, SetVictoryConditions));
    exports.Set("setGameAccess", Napi::Function::New(env, SetGameAccess));
    exports.Set("processTextInput", Napi::Function::New(env, ProcessTextInput));
    exports.Set("getTextOutput", Napi::Function::New(env, GetTextOutput));
    exports.Set("simulateInboundEmail", Napi::Function::New(env, SimulateInboundEmail));
    exports.Set("getOutboundEmails", Napi::Function::New(env, GetOutboundEmails));
    return exports;
}

NODE_API_MODULE(dip, Init) 