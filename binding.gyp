{
  "targets": [
    {
      "target_name": "dip_binding",
      "sources": [
        "dip_binding.cpp"
      ],
      "include_dirs": [
        "..",
        "."
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "cflags": [
        "-fPIC",
        "-Wno-unused-result"
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