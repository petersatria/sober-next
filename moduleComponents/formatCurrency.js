const formatCurrency = (numberss, prefix) => {
  let number_string = String(numberss)
      .replace(/[^,\d]/g, "")
      .toString(),
    split = number_string.split(","),
    rest = split[0].length % 3,
    rupiah = split[0].substr(0, rest),
    thousand = split[0].substr(rest).match(/\d{3}/gi);

  if (thousand) {
    let separator = rest ? "." : "";
    rupiah += separator + thousand.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;

  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

export { formatCurrency };
