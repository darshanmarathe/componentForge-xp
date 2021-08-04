(function () {
    var bindings = document.querySelectorAll('bindings  binding')
    function getObject(rootObject , str) {
        let props = str.split('.')
        let currObj = rootObject;

        props.forEach((prop , i) => {
            currObj = currObj[prop]
        });

        return currObj
    }
    bindings.forEach(binding => {

        const source = binding.getAttribute('source');
        const event = binding.getAttribute('event');
        const target = binding.getAttribute('target');
        const property = binding.getAttribute('property');
        const pipe = binding.getAttribute('pipe');

        const elemToBind = document.querySelector(source);
        const targetElement = document.querySelector(target);
        if (!(pipe != undefined && pipe.trim() != "")) {
            if (elemToBind == null || targetElement == null) {
                console.error("source element ", elemToBind, " or target element", targetElement, " not found")
                return;
            }

        }

        elemToBind.addEventListener(event, function (e) {


            if (pipe != undefined && pipe.trim() != "") {
                let func = getObject(window , pipe);
                func(e);
                return;
            }

            var [k1, k2, k3] = property.split(".")
            switch (property.split(".").length) {
                case 1:
                    targetElement[k1] = (e.detail || e.target.value);
                    break;
                case 2:
                    targetElement[k1][k2] = (e.detail || e.target.value);
                    break;
                case 3:
                    targetElement[k1][k2][k3] = (e.detail || e.target.value);
                    break;
                default:
                    break;
            }

        })
    })



})()