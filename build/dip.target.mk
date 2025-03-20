# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := dip
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=dip' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-D_GNU_SOURCE' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-fPIC \
	-fPIC \
	-Wno-unused-result \
	-Wno-pointer-sign \
	-fcommon \
	-m64 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-std=gnu++17

INCS_Debug := \
	-I/home/judge/.cache/node-gyp/20.19.0/include/node \
	-I/home/judge/.cache/node-gyp/20.19.0/src \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/openssl/config \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/openssl/openssl/include \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/uv/include \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/zlib \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/v8/include \
	-I/home/judge/src/nodejs-binding/node_modules/node-addon-api \
	-I$(srcdir)/.. \
	-I$(srcdir)/.

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=dip' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-D_GNU_SOURCE' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-fPIC \
	-fPIC \
	-Wno-unused-result \
	-Wno-pointer-sign \
	-fcommon \
	-m64 \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-std=gnu++17

INCS_Release := \
	-I/home/judge/.cache/node-gyp/20.19.0/include/node \
	-I/home/judge/.cache/node-gyp/20.19.0/src \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/openssl/config \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/openssl/openssl/include \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/uv/include \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/zlib \
	-I/home/judge/.cache/node-gyp/20.19.0/deps/v8/include \
	-I/home/judge/src/nodejs-binding/node_modules/node-addon-api \
	-I$(srcdir)/.. \
	-I$(srcdir)/.

OBJS := \
	$(obj).target/$(TARGET)/dip_binding.o \
	$(obj).target/$(TARGET)/../porder.o \
	$(obj).target/$(TARGET)/../dip.o \
	$(obj).target/$(TARGET)/../dipent.o \
	$(obj).target/$(TARGET)/../global.o \
	$(obj).target/$(TARGET)/../diptime.o \
	$(obj).target/$(TARGET)/../variant.o \
	$(obj).target/$(TARGET)/../bailout.o \
	$(obj).target/$(TARGET)/../conf.o \
	$(obj).target/$(TARGET)/../hashtable.o \
	$(obj).target/$(TARGET)/../lib.o \
	$(obj).target/$(TARGET)/../users.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# Make sure our dependencies are built before any of us.
$(OBJS): | $(builddir)/nothing.a $(obj).target/node_modules/node-addon-api/nothing.a

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.c FORCE_DO_CMD
	@$(call do_cmd,cc,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS :=

$(obj).target/dip.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/dip.node: LIBS := $(LIBS)
$(obj).target/dip.node: TOOLSET := $(TOOLSET)
$(obj).target/dip.node: $(OBJS) $(obj).target/node_modules/node-addon-api/nothing.a FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/dip.node
# Add target alias
.PHONY: dip
dip: $(builddir)/dip.node

# Copy this to the executable output path.
$(builddir)/dip.node: TOOLSET := $(TOOLSET)
$(builddir)/dip.node: $(obj).target/dip.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/dip.node
# Short alias for building this executable.
.PHONY: dip.node
dip.node: $(obj).target/dip.node $(builddir)/dip.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/dip.node

