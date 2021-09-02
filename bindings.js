document.addEventListener("DOMContentLoaded", () => {

    var bindings = document.querySelectorAll('bindings  binding')
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined' ?
                    args[number] :
                    match;
            });
        };
    }

    function getFunc(str, rootObject = window) {
        let props = str.split('.')
        let currObj = rootObject;

        props.forEach((prop, i) => {
            currObj = currObj[prop]
        });

        return currObj
    }

    function setObject(str, value, rootObject, targetFormat, isObject,sourceproperty) {
        let props = str.split('.')
        let currObj = rootObject;

        const lastIndex = (props.length - 1)
        const lastProp = props[lastIndex]
        props.forEach((prop, i) => {
            if (i == lastIndex) return;
            currObj = currObj[prop]
        });
        
        if(sourceproperty  && sourceproperty !== ""){
            value  = value.getAttribute(sourceproperty);      
        }
        
        if (isObject)
        {
            currObj[lastProp] = value;
            return;
        }
        if (targetFormat.startsWith("+")) {
            targetFormat = targetFormat.substring(1);
            currObj[lastProp] = currObj[lastProp] + targetFormat.format(value);
        } else
            currObj[lastProp] = targetFormat.format(value);
        
    }
   debugger;
    bindings.forEach(binding => {

        const source = binding.getAttribute('source');
        const event = binding.getAttribute('event');
        const target = binding.getAttribute('target');
        const property = binding.getAttribute('property');
        const sourceproperty = binding.getAttribute('sourceproperty');
        const pipe = binding.getAttribute('pipe');
        const targrtFormat = binding.getAttribute('targrtFormat') || "{0}";
        const isObject = binding.hasAttribute('object');

        const elemToBind = document.querySelectorAll(source);
        const targetElement = document.querySelectorAll(target);
        if (!(pipe != undefined && pipe.trim() != "")) {
            if (elemToBind.length === 0 || targetElement.length === 0) {
                console.error("source element ", elemToBind, " or target element", targetElement, " not found")
                return;
            }

        }

    elemToBind.forEach((elem) => {
   
   
        elem.addEventListener(event, function (e) {

            if (pipe != undefined && pipe.trim() != "") {
                let func = getFunc(pipe);
                if(typeof(func) !== "function") {
                    console.error("function with name " + pipe + "not found.")
                    return;
                }
                func(e, targetElement);
                return;
            }
            targetElement.forEach((telem) => {
                if (sourceproperty && sourceproperty !== "") {
                    setObject(property, (e.target), telem , targrtFormat , isObject , sourceproperty);
                }else{

                setObject(property, (e.detail || e.target.value || e.target), telem , targrtFormat , isObject , sourceproperty);
                }
            });
        })
    });
    })



});