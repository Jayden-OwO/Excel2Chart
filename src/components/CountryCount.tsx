// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { getFormatDate_XLSX } from "@/utils/tools";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

const CountryCount: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "各国家产品询盘次数",
    },
    width: "100%",
    height: 700,
    tooltip: {
      trigger: "item",
    },
    legend: {
      // top: "5%",
      left: "0",
      orient: "vertical",
      top: "center",
      height: "70%",
      itemGap: 5,
      // itemWidth: 15,
    },
    series: [
      {
        // hoverAnimation: false,
        name: "各国家产品询盘次数",
        type: "pie",
        clockwise: true,
        radius: "50%",
        // center: ["50%", "50%"], //左右，上下
        avoidLabelOverlap: true,
        // itemStyle: {
        //   borderRadius: 10,
        //   borderColor: "#fff",
        //   borderWidth: 2,
        // },
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
        labelLine: {
          normal: {
            show: true,
            // smooth: true,
            length: 20, // 第一段线 长度
            length2: 50, // 第二段线 长度
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
      let country: any = []; // 找出数组中的业务员
      data.map((item: any) => {
        if (!country.includes(item["国家"])) {
          country.push(item["国家"]);
        }
      });
      // 计算数量
      let handleCountryCount: any[] = [];
      country.forEach((item: any) => {
        handleCountryCount.push({
          name: item,
          value: data.filter((res: any) => res["国家"] === item).length,
        });
      });
      optionInfo.series[0].data = handleCountryCount;
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="country-count-chart" height={700} />
    </div>
  );
};

export default CountryCount;
