{
  "targets": [
    {
      "target_name": "dip",
      "sources": [
        "dip_binding.cpp",
        "../porder.c",
        "../dip.c",
        "../dipent.c",
        "../global.c",
        "../diptime.c",
        "../variant.c",
        "../bailout.c",
        "../conf.c",
        "../hashtable.c",
        "../lib.c",
        "../users.c"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "..",
        "."
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "cflags": [
        "-fPIC",
        "-Wno-unused-result",
        "-Wno-pointer-sign",
        "-fcommon"
      ],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "MACOSX_DEPLOYMENT_TARGET": "10.7"
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      },
      "conditions": [
        ["OS=='linux'", {
          "cflags+": ["-fPIC"],
          "defines": ["_GNU_SOURCE"]
        }]
      ]
    }
  ]
} 