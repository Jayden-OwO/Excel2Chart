// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { getFormatDate_XLSX } from "@/utils/tools";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

const EmailHandleCount: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "邮件处理数",
    },
    width: "100%",
    height: 700,
    tooltip: {
      trigger: "item",
    },
    legend: {
      // top: "5%",
      left: "10%",
      orient: "vertical",
      top: "center",
    },
    series: [
      {
        // hoverAnimation: false,
        name: "邮件处理数",
        type: "pie",
        clockwise: true,
        radius: ["40%", "65%"],
        // center: ["50%", "50%"], //左右，上下
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          formatter: "{b} {d}%\n{c_set|{c}}",
          position: "outside",
          rich: {
            c_set: {
              color: "#808080",
              lineHeight: 20,
            },
          },
        },
        // label: {
        //   // show: false,
        //   // position: "center",
        //   normal: {
        //     show: true,
        //     // position: "outside",
        //     // formatter: '{d}%, {c} \n\n',
        //     //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
        //     formatter: "{a_set|{b} {d}%}\n{c_set|{c}次}\n\n\n",
        //     // borderWidth: 20,
        //     // borderRadius: 4,
        //     // padding: [90, -50],
        //     rich: {
        //       a_set: {
        //         fontSize: 15,
        //         color: "#1a1a1a",
        //         lineHeight: 20,
        //         // align: "center",
        //       },
        //       c_set: {
        //         color: "#808080",
        //       },
        //     },
        //   },
        // },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        labelLine: {
          normal: {
            show: true,
            // smooth: true,
            length: 55, // 第一段线 长度
            length2: 20, // 第二段线 长度
            align: "right",
          },
        },
        // data: [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ]
      },
    ],
  });

  useEffect(() => {
    if (data && data.length) {
      let optionInfo: EChartsOption = JSON.parse(JSON.stringify(option));
      let saleMan: any = []; // 找出数组中的业务员
      data.map((item: any) => {
        if (!saleMan.includes(item["负责人"])) {
          saleMan.push(item["负责人"]);
        }
      });
      // 计算数量
      let handleEmailCount: any[] = [];
      saleMan.forEach((item: any) => {
        handleEmailCount.push({
          name: item,
          value: data.filter((res: any) => res["负责人"] === item).length,
        });
      });
      console.log(handleEmailCount);
      optionInfo.series[0].data = handleEmailCount;
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="email-handle-count-chart" height={700} />
    </div>
  );
};

export default EmailHandleCount;
