const langArray = [
  { value: "val1", text: "text 1" },
  { value: "val2", text: "text 2" },
];
function loadOptions(langArray) {
  let select = document.getElementById("select"),
    option,
    i = 0,
    il = langArray.length;

  $("#choice").text("Escolha uma moeda");
  for (; i < il; i += 1) {
    option = document.createElement("option");
    option.setAttribute("value", langArray[i].code);
    option.appendChild(document.createTextNode(langArray[i].name));
    select.appendChild(option);
  }
}

function requestOptions() {
  $.getJSON("/api/price/code", function (data) {
    loadOptions(data);
  });
}

$(document).ready(function () {
  requestOptions();
});

function getValue() {
  const code = $("#select").val();
  const codeName = $("#select option:selected").text();
  const codeNames = codeName.split(" ")[0].toLowerCase() + 's'
  const value = $("#value").val();
  if (!code || !value) {
    Swal.fire({
        icon: "error",
        title: "Ops...",
        html: `Preencha os campos corretamente`,
      });
    return;
  }
  Swal.showLoading();
  $.getJSON(
    `/api/price/${code}/${value}`,
    function (data) {
      Swal.fire({
        icon: "success",
        title: codeName,
        html: `${value} reais convertido para ${codeName} é equivalente a aproximadamente <b>${data.ask.toFixed(2)} ${codeNames}</b>`,
        footer: `1 ${codeName} equivale a ${data.value.toFixed(2)} reais`,
      });
    }
  );
}
