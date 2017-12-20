var fn
function foo(){
    var a = 2
    var b = 2
    function baz() {
        console.log(a,b)
    }
    fn = baz
}
function bar() {
    fn()
    console.log(a,b)
}
foo()
bar()