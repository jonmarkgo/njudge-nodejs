cmd_Release/obj.target/dip.node := g++ -o Release/obj.target/dip.node -shared -pthread -rdynamic -m64  -Wl,-soname=dip.node -Wl,--start-group Release/obj.target/dip/dip_binding.o Release/obj.target/dip/../porder.o Release/obj.target/dip/../dip.o Release/obj.target/dip/../dipent.o Release/obj.target/dip/../global.o Release/obj.target/dip/../diptime.o Release/obj.target/dip/../variant.o Release/obj.target/dip/../bailout.o Release/obj.target/dip/../conf.o Release/obj.target/dip/../hashtable.o Release/obj.target/dip/../lib.o Release/obj.target/dip/../users.o Release/obj.target/node_modules/node-addon-api/nothing.a -Wl,--end-group 
