import { utils, read } from "xlsx";

//将excel的日期格式转成Date()对象;
export const getFormatDate_XLSX = (serial: number) => {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  var fractional_day = serial - Math.floor(serial) + 0.0000001;
  var total_seconds = Math.floor(86400 * fractional_day);
  var seconds = total_seconds % 60;
  total_seconds -= seconds;
  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  var d = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
  var add0 = (m) => (m < 10 ? "0" + m : m);
  // var d = getFormatDate_XLSX(44358.9999884259);
  var YYYY = d.getFullYear();
  var MM = add0(d.getMonth() + 1);
  var DD = add0(d.getDate());
  var hh = add0(d.getHours());
  var mm = add0(d.getMinutes());
  return `${YYYY}-${MM}-${DD}`;
  // return d;
};

export const importXlsx = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event?.target?.result;
        // 读取工作簿
        const workbook = read(data, { type: "binary" });
        // 读取第一个工作表，如需读取指定工作表，请改为 workbook.Sheets['工作表名称']
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // 将工作表转为 js 对象
        const json = utils.sheet_to_json(sheet);
        resolve(json);
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};
