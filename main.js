//---PLEASE REFACTOR ALL OF THIS LATER LMAO ITS A MESS

selected_mix = "";

//All values in ounces
mix_values = {
    w_ww_bread : {
        flour : 704,
        base : 176,
        yeast : 20,
        w_water : 496,
        ww_water : 512
    }
}

//Fetch document elements
p_mix_title = document.getElementById('mix_title');
p_mix_output = document.getElementById('mix_output');

inp_mix_input = document.getElementById('mix_input');

btn_mix_button = document.getElementById('mix_button');

//Initialize mix elements so they start off hidden
window.addEventListener('DOMContentLoaded', function(event){
    inp_mix_input.style.display="none";
    btn_mix_button.style.display="none";
});

//Assign the mix to a value when selected
function assign_mix(mix) {
    selected_mix = mix;

     //Toggle mix visuals
    if(selected_mix == "") {
        inp_mix_input.style.display="none"
        btn_mix_button.style.display="none";
    }
    else {
        inp_mix_input.style.display="block"
        btn_mix_button.style.display="block"
    }

}

//Calculate value for mix ingredients based off quantity of flour
function calculate_mix() {
    let mix = {};

    //Grab mix from string
    switch(selected_mix) {
        case('w-w/w-bread'):
            mix = mix_values.w_ww_bread;
            break;
    }

    264
    
    let lbs_value = inp_mix_input.value * 16;
    let factor = lbs_value / mix.flour;
    let base = (mix.base * factor) / 16;
    let yeast = (mix.yeast * factor) / 16;
    let white_water = (mix.w_water * factor) / 16;
    let ww_water = (mix.ww_water * factor) / 16;

    //Convert to strings
    if (base === Math.floor(base)) {
        base = base.toString() + " lb";
    } else {
        let oz = Math.floor(base);
        let i = base - oz;
        base = oz.toString() + " lb " + (i * 16).toString() + " oz";
    }
    if (yeast === Math.floor(yeast)) {
        yeast = yeast.toString() + " lb";
    } else {
        let oz = Math.floor(yeast);
        let i = yeast - oz;
        yeast = oz.toString() + " lb " + (i * 16).toString() + " oz";
    }

    white_water = white_water.toString() + " lb";
    ww_water = ww_water.toString() + " lb";

    p_mix_output.innerText = "Base: " + base + "\n" + "Yeast: " + yeast + "\n" + "W Water: " + white_water + "\n" + "W/W Water: " + ww_water;

}

