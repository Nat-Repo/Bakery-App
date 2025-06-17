//---PLEASE REFACTOR ALL OF THIS LATER LMAO ITS A MESS

version_number  = '0.02';
selected_mix    = '';

//Dictionary storing all values in ounces
mix_values = {

    w_ww_bread : {
        flour       : 704,
        base        : 176,
        yeast       : 20,
        w_water     : 496,
        ww_water    : 512
    },

    w_bun_dough : {
        flour       : 704,
        base        : 176,
        yeast       : 20,
        w_water     : 416
    },

    ww_bun_dough : {
        flour       : 704,
        base        : 176,
        yeast       : 20,
        ww_water    : 416
    }
}

bake_times = {

    croissants_danish_brioche : {
        name : 'Croissants, Danish and Brioche: ',
        time : '350° for 15 minutes'
    },

    butterpan : {
        name : 'Butterpan: ',
        time : '350° for 14 minutes'
    },

    hots_hams : {
        name : 'Hots and Hams: ',
        time : '350° for 16 minutes'
    },

    muffins_tops : {
        name : 'Muffins and Tops: ',
        time : '350° for 29 minutes, \ntake tops out at 18-19 minutes'
    },

    cookies : {
        name : 'Cookies: ',
        time : '340° for 12 minutes'
    },

    w_ww_bread : {
        name : 'White and WW Bread: ',
        time : '370° for 24 minutes'
    },

    crusty_kaiser : {
        name : 'Crusty and kaisers: ',
        time : '390° for 18 minutes, 5 seconds of steam'
    },

    sour_pump : {
        name : 'Sourdough and pumpernickle: ',
        time : '390° for 27 minutes, 20 seconds of steam'
    },

    sandwich_bread : {
        name : 'Sandwich bread: ',
        time : '370° for 30 minutes'
    },

    fruit_bread : {
        name : 'Fruit bread: ',
        time : '370° for 24 minutes'
    }
}

//Fetch document elements
p_mix_title     = document.getElementById('mix_title');
p_mix_output    = document.getElementById('mix_output');

inp_mix_input   = document.getElementById('mix_input');
inp_hidden      = document.getElementById('hidden_inp');

btn_mix_button  = document.getElementById('mix_button');

h_h1            = document.getElementById('header');


//Initialize mix elements so they start off hidden
window.addEventListener('DOMContentLoaded', function(event){
    h_h1.innerText                  ='Bakery App v' + version_number;

    if(document.URL.includes('baketimes.html')) {
        console.log("f");
        let p = document.getElementById('bake_times');
        p.innerText = generate_bake_times(bake_times).toString();
    } else {
        inp_mix_input.style.display     ="none";
        inp_hidden.style.display        ="none";
        btn_mix_button.style.display    ="none";
    }
});

//Assign the mix to a value when selected
function assign_mix(mix) {

    //Assign selected_mix a string value we can use to access dictionary later
    selected_mix = mix;

     //Toggle mix visuals
    if(selected_mix == "") {
        inp_mix_input.style.display     ="none";
        inp_hidden.style.display        ="none";
        btn_mix_button.style.display    ="none";
    } else {
        inp_mix_input.style.display     ="block";
        inp_hidden.style.display        ="block";
        btn_mix_button.style.display    ="block";
    }
    
    //Set title text
    switch(selected_mix) {
        case('w_ww_bread'):
            p_mix_title.innerText = 'White / Whole Wheat Bread'
            break;

        case('w_bun_dough'):
            p_mix_title.innerText = 'White Bun Dough'
            break;
    }

    p_mix_output.innerText = "";
}

//Calculate value for mix ingredients based off quantity of flour
function calculate_mix() {

    //Initialize lbs value and factor
    let lbs_value       = inp_mix_input.value * 16;
    let factor          = 1;

    //Define temporary variable to store mix data
    let mix = {};

    //Grab mix from string
    switch(selected_mix) {

        case('w_ww_bread'):
            mix     = mix_values.w_ww_bread;
            factor  = lbs_value / mix.flour;
            p_mix_title.innerText = 'White / Whole Wheat Bread'
            break;

        case('w_bun_dough'):
            mix     = mix_values.w_bun_dough;
            factor  = lbs_value / mix.flour;
            p_mix_title.innerText = 'White Bun Dough'
            break;
    }
    
    //Calculate individual strings for each ingredient
    let base            = oz_converter(mix.base, factor);
    let yeast           = oz_converter(mix.yeast, factor);
    let white_water     = (mix.w_water  * factor / 16).toString() + " lb";
    let ww_water        = (mix.ww_water * factor / 16).toString() + " lb";

    //Create output string to display in browser, maybe make a function to generate string?
    switch(selected_mix) {

        case('w_ww_bread'):
            p_mix_output.innerText = "Base: " + base + "\n" + "Yeast: " + yeast + "\n" + "W Water: " + white_water + "\n" + "W/W Water: " + ww_water;
            break;

        case('w_bun_dough'):
            p_mix_output.innerText = "Base: " + base + "\n" + "Yeast: " + yeast + "\n" + "Water: " + white_water;
            break;
    }
   

}

//Converts a value in ounces, multiplies it by a factor, and converts it into a string displaying lbs and ounces
//Maybe make this more legible. Variables name are not good!
function oz_converter(num, factor) {
    let n = (num * factor) / 16;
    if (n === Math.floor(n)) {
        return n.toString() + " lb"
    } else {
        let n2 = Math.floor(n);
        let n3 = n - n2;
        return n2.toString() + " lb " + (n3 * 16).toString() + " oz";
    }
}

function generate_bake_times(dict) {
    let str = "";

    for (let i in dict) {
        let str1 = dict[i].name;
        let str2 = dict[i].time;
        str += str1 + "\n" + str2 + '\n' + ' \n';
    }

    return str;
}