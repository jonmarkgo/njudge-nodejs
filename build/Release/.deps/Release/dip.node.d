cmd_Release/dip.node := ln -f "Release/obj.target/dip.node" "Release/dip.node" 2>/dev/null || (rm -rf "Release/dip.node" && cp -af "Release/obj.target/dip.node" "Release/dip.node")
