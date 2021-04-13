//Get the form responses and generate a pre build text
function generateText() {
    //Get form responses
    let tipo_value                  = document.getElementById("tipo").value;
    let area_value                  = document.getElementById("area").value;
    let pe_direito_value            = document.getElementById("pe_direito").value;
    let piso_value                  = document.getElementById("piso").value;
    let parede_value                = document.getElementById("parede").value;
    let teto_value                  = document.getElementById("teto").value;
    let banheiros                   = document.getElementById("banheiros").value;
    let ventilacao_natural_itens    = getFieldCheckbox("ventilacao_natural_");
    let ventilacao_artificial_itens = getFieldCheckbox("ventilacao_artificial_");
    let iluminacao_natural_itens    = getFieldCheckbox("iluminacao_natural_");
    let iluminacao_artificial_itens = getFieldCheckbox("iluminacao_artificial_");
    let mobiliario_itens            = getFieldCheckbox("mobiliario_");
    

    //Clean text area
    let texto_ambiente = "";

    //Build the new text
    texto_ambiente += "O ambiente de trabalho constitui-se de ";
    texto_ambiente += tipo_value;
    texto_ambiente += " com aproximadamente ";
    texto_ambiente += area_value;
    texto_ambiente += " m² de área. Possui pé direito com cerca de ";
    texto_ambiente += pe_direito_value;
    texto_ambiente += " m; piso em ";
    texto_ambiente += piso_value;
    texto_ambiente += "; paredes em ";
    texto_ambiente += parede_value;
    texto_ambiente += "; teto em ";
    texto_ambiente += teto_value;
    if (ventilacao_natural_itens == "") {
        texto_ambiente += "; ventilação natural não identificada";
    } else {
        texto_ambiente += "; ventilação natural por meio de ";
        texto_ambiente += ventilacao_natural_itens;
    };
    if (ventilacao_artificial_itens == "") {
        texto_ambiente += "; ventilação artificial não identificada";
    } else {
        texto_ambiente += "; ventilação artificial por meio de ";
        texto_ambiente += ventilacao_artificial_itens;
    };
    if (iluminacao_natural_itens == "") {
        texto_ambiente += "; iluminação natural não identificada";
    } else {
        texto_ambiente += "; iluminação natural por meio de ";
        texto_ambiente += iluminacao_natural_itens;
    };
    if (iluminacao_artificial_itens == "") {
        texto_ambiente += "; iluminação artificial não identificada";
    } else {
        texto_ambiente += "; iluminação artificial por meio de ";
        texto_ambiente += iluminacao_artificial_itens;
    };
    texto_ambiente += ". O local conta com ";
    texto_ambiente += mobiliario_itens;
    texto_ambiente += "."
    if(banheiros != "nenhum") {
        texto_ambiente += " O local conta ainda com ";
        texto_ambiente += banheiros;
        if (banheiros == "um") {
            texto_ambiente += " banheiro.";
        } else {
            texto_ambiente += " banheiros.";
        }
    }

    //Show text in text area
    document.getElementById("texto").value = texto_ambiente;

    return;
}

//Get checkboxes checked from a specific area of the form
//Every checkbox group has an id pattern, with a serial number
//at the end to iterate through (ex.: field_0, field_1, field_n)
function getFieldCheckbox(field) {
    let checked_elements = [];
    let field_elements_number = document.getElementsByClassName(field).length;

    //Iterate through checkboxes
    for (let i = 0; i < field_elements_number; i++) {
        let field_element = document.getElementById(field + i);
        //Check if checkbox is checked
        if (field_element.checked == true) {
            let field_value = field_element.value;
            checked_elements.push(field_value);
        }
    }

    //Convert checkboxes checked array to string
    let checked_elements_string = checked_elements.toString();

    //Fix text punctuation
    if (checked_elements.length > 1) {
        let n = checked_elements_string.lastIndexOf(",");
        let str1 = checked_elements_string.substr(0,n);
        let str2 = checked_elements_string.substr(n + 1, checked_elements_string.length - 1);
        checked_elements_string = str1 + " e " + str2;
    }

    //Put a space after commas
    checked_elements_string = checked_elements_string.replace(/,/g, ", ");

    //Return string with text representing checkboxes checked
    return checked_elements_string;
}

//Copy text from text area
function copyText() {
    let copyText = document.getElementById("texto");
    copyText.select();
    document.execCommand("copy");

    //Show alert message for text copied
    //Alert position is set by CSS style
    document.getElementById("alerta_texto_copiado").style.display = "block";
    setTimeout(hideAlert, 1000);
    function hideAlert() {
        document.getElementById("alerta_texto_copiado").style.display = "none";
        return;
    }
    return;
}

//Clear text area
function clearText() {
    document.getElementById("texto").value = "";
}