package main

import (
	"encoding/json"
	"syscall/js"
)

func prettifyJSON(this js.Value, inputs []js.Value) interface{} {
	println("WASM prettifyJSON called")
	input := inputs[0].String()

	var obj interface{}
	err := json.Unmarshal([]byte(input), &obj)
	if err != nil {
		js.Global().Call("alert", "Error parsing JSON: "+err.Error())
		return nil
	}

	println("DONE UNMARSHLING")

	prettyJSON, err := json.MarshalIndent(obj, "", "    ")
	if err != nil {
		js.Global().Call("alert", "Error prettifying JSON: "+err.Error())
		return nil
	}

	println("DONE MARSHLING WITH INDENTATION")

	js.Global().Call("displayJSON", string(prettyJSON))

	return nil
}

func registerCallbacks() {
	js.Global().Set("prettifyJSON", js.FuncOf(prettifyJSON))
}

func main() {
	c := make(chan struct{}, 0)

	println("WASM Go Initialized")

	registerCallbacks()

	<-c
}
