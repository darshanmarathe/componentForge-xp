(function(){
    var bindings = document.querySelectorAll('bindings  binding')

    bindings.forEach(binding => {

        const source = binding.getAttribute('source');
        const event = binding.getAttribute('event');
        const target= binding.getAttribute('target');
        const property = binding.getAttribute('property');

        const elemToBind = document.querySelector(source);
        const targetElement = document.querySelector(target);

        if(elemToBind == null || targetElement == null) {
            console.error("source element " , elemToBind , " or target element" , targetElement , " not found")
            return;
        }
        elemToBind.addEventListener(event ,  (e) => {
            targetElement[property] = e.detail || e.target.value ;
        })
    })


})()