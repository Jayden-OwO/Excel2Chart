// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { getFormatDate_XLSX } from "@/utils/tools";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

const Email: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "每天/累计 询盘邮件数",
    },
    width: "95%",
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["邮件数", "累计邮件数"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
        start: 30,
        end: 100,
      },
      {
        // type: "inside",
        start: 30,
        end: 100,
      },
    ],
    xAxis: {
      type: "category",
      splitLine: {
        show: true,
      },
      data: [],
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
      },
    },
  });

  useEffect(() => {
    if (data && data.length) {
      let optionInfo: EChartsOption = JSON.parse(JSON.stringify(option));
      let date: any = []; // 找出数组中的日期
      data.map((item: any) => {
        item["日期"] = getFormatDate_XLSX(item["日期"]);
        if (!date.includes(item["日期"])) {
          date.push(item["日期"]);
        }
      });
      // 按照日期排序
      date.sort((a: string, b: string) => {
        return new Date(a).getDate() - new Date(b).getDate();
      });
      // 计算邮件数
      let emailCount: number[] = [];
      date.forEach((item: any) => {
        emailCount.push(data.filter((res: any) => res["日期"] === item).length);
      });
      // 计算邮件数
      let allEmailCount: number[] = [];
      date.forEach((item: any, index: number) => {
        allEmailCount.push(
          index
            ? data.filter((res: any) => res["日期"] === item).length +
                allEmailCount[index - 1]
            : data.filter((res: any) => res["日期"] === item).length
        );
      });
      optionInfo.xAxis = {
        ...optionInfo.xAxis,
        data: date,
      };
      optionInfo.series = [
        {
          name: "邮件数",
          type: "line",
          data: emailCount,
          // stack: "Total",
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 12,
                },
              },
            },
          },
        },
        {
          name: "累计邮件数",
          type: "line",
          data: allEmailCount,
          // stack: "Total",
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 12,
                },
              },
            },
          },
        },
      ];
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="email-chart" />
    </div>
  );
};

export default Email;
