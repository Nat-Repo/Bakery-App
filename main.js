
//---PLEASE REFACTOR ALL OF THIS LATER LMAO ITS A MESS

version_number  = '0.1';
selected_mix    = '';

data = undefined;

//Fetch document elements
p_mix_title     = document.getElementById('mix_title');
p_mix_output    = document.getElementById('mix_output');


inp_mix_input   = document.getElementById('mix_input');
inp_hidden      = document.getElementById('hidden_inp');

btn_mix_button  = document.getElementById('mix_button');

h_h1            = document.getElementById('header');

//Load json and then initialize web page text
async function initialize_page() {

    //Get hostname to determine whether we are local
    let nm = window.location.hostname;

    //Grab json and save to data
    response  = await fetch(nm === "127.0.0.1" || nm === "localhost" || nm === "" ?
        'data.json' :
        'https://nat-repo.github.io/Bakery-App/data.json'
    );

    //Grab json data
    data      = await response.json();

    //Set page text from data
    await (async () => {

        //Append version number
        h_h1.innerText ='Bakery App v' + version_number;

        //Initialize elements depending on page
        if(document.URL.includes('baketimes.html')) {

            let p = document.getElementById('bake_times');
            p.innerText = generate_bake_times(data.bake_times);

        } else if (document.URL.includes('recipes.html')) {

            let p_recipes = document.getElementById('recipes');
            p_recipes.innerText = generate_recipes(data.recipes);

        } else if (document.URL.includes('mixcalc.html')) {

            inp_mix_input.style.display     ="none";
            inp_hidden.style.display        ="none";
            btn_mix_button.style.display    ="none";

        }

    })();
}

initialize_page();

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
            p_mix_title.innerText = 'White / Whole Wheat Bread';
            break;

        case('w_bun_dough'):
            p_mix_title.innerText = 'White Bun Dough';
            break;

        case('ww_bun_dough') :
            p_mix_title.innerText = '60% Bun Dough';
            break;

        case ('crusty_kaiser') :
            p_mix_title.innerText = 'Crusty / Kaiser Buns';
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
            mix     = data.mix_values.w_ww_bread;
            factor  = lbs_value / mix.em_flour;
            p_mix_title.innerText = 'White / Whole Wheat Bread';
            break;

        case('w_bun_dough'):
            mix     = data.mix_values.w_bun_dough;
            factor  = lbs_value / mix.em_flour;
            p_mix_title.innerText = 'White Bun Dough';
            break;

        case('ww_bun_dough'):
            mix     = data.mix_values.ww_bun_dough;
            factor  = lbs_value / (mix.em_flour + mix.ww_flour);
            p_mix_title.innerText = '60% Bun Dough';
            break;

        case('crusty_kaiser'):
            mix     = data.mix_values.crusty_kaiser;
            factor  = lbs_value / mix.d_flour;
            p_mix_title.innerText = 'Crusty / Kaiser Buns';
            break;
    }
    
    //Calculate individual strings for each ingredient. Make sure to check if mix has ingredient before assigning
    let em_flour        = mix.hasOwnProperty('em_flour')    ? oz_converter(mix.em_flour,    factor) : "";
    let ww_flour        = mix.hasOwnProperty('ww_flour')    ? oz_converter(mix.ww_flour,    factor) : "";
    let d_flour         = mix.hasOwnProperty('d_flour')     ? oz_converter(mix.d_flour,     factor) : "";
    let base            = mix.hasOwnProperty('base')        ? oz_converter(mix.base,        factor) : "";
    let yeast           = mix.hasOwnProperty('yeast')       ? oz_converter(mix.yeast,       factor) : "";
    let salt            = mix.hasOwnProperty('salt')        ? oz_converter(mix.salt,        factor) : "";
    let sugar           = mix.hasOwnProperty('sugar')       ? oz_converter(mix.sugar,       factor) : "";
    let s500            = mix.hasOwnProperty('s500')        ? oz_converter(mix.s500,        factor) : "";
    let oil             = mix.hasOwnProperty('oil')         ? oz_converter(mix.oil,         factor) : "";

    let white_water     = mix.hasOwnProperty('w_water')     ? (mix.w_water  * factor / 16).toString() + " lb" : "";
    let ww_water        = mix.hasOwnProperty('ww_water')    ? (mix.ww_water * factor / 16).toString() + " lb" : "";

    //Create output string to display in browser, maybe make a function to generate string?
    switch(selected_mix) {

        case('w_ww_bread'):
            p_mix_output.innerText = "Flour: " + em_flour + " - (Whole wheat or emerald)" + "\n" + "Base: " + base + "\n" + "Yeast: " + yeast + "\n" + "W Water: " + white_water + "\n" + "W/W Water: " + ww_water;
            break;

        case('w_bun_dough'):
            p_mix_output.innerText = "Emerald Flour: " + em_flour + "\n" + "Base: " + base + "\n" + "Yeast: " + yeast + "\n" + "Water: " + white_water;
            break;

        case('ww_bun_dough'):
            p_mix_output.innerText = "Emerald flour: " + em_flour + "\n" + "Whole wheat flour: " + ww_flour + "\n" + "Base: " + base + "\n" + "Yeast: " + yeast + "\n" + "Water: " + white_water;
            break;

        case('crusty_kaiser'):
            p_mix_output.innerText = "Diamond flour: " + d_flour + "\n" + "Yeast: " + yeast + "\n" + "Salt: " + salt  + "\n" + "Sugar: " + sugar + "\n" + "S500: " + s500 + "\n" + "Oil: " + oil + "\n" + "Water: " + white_water;
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
    let str = " \n";

    for (let i in dict) {
        //console.log(dict[i]);
        let str1 = dict[i].name;
        let str2 = dict[i].time;
        str += str1 + "\n" + str2 + '\n' + ' \n';
    }

    //console.log(str);
    return str;
}

function generate_recipes(dict) {
    let str = " \n";

    for (let i in dict) {
        //console.log(dict[i]);
        let str1 = dict[i].name;
        let str2 = dict[i].ingredients;
        let str3 = dict[i].instructions;
        str += str1 + "\n" + str2 + "\n" + str3 + '\n' + ' \n';
    }

    //console.log(str);
    return str;
}


