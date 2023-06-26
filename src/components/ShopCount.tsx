// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { compare } from "@/utils/tools";
import { useEffect, useState } from "react";

interface Props {
  data: any;
}

const ShopCount: React.FC<Props> = ({ data }) => {
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "各店铺数据",
    },
    width: "100%",
    height: 700,
    tooltip: {
      trigger: "item",
    },
    legend: {
      // top: "5%",
      left: "center",
      // orient: "vertical",
      // top: "center",
      // height: "70%",
      // itemGap: 5,
      // itemWidth: 15,
    },
    series: [
      {
        // hoverAnimation: false,
        name: "各店铺数据",
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
      let shop: any = []; // 找出数组中的业务员
      data.map((item: any) => {
        if (!shop.includes(item["店铺"])) {
          shop.push(item["店铺"]);
        }
      });
      // 计算数量
      let handleShopCount: any[] = [];
      shop.forEach((item: any) => {
        handleShopCount.push({
          name: item,
          value: data.filter((res: any) => res["店铺"] === item).length,
        });
      });
      const newInfo = handleShopCount.sort(compare("value"));
      optionInfo.series[0].data = newInfo;
      setOption(optionInfo);
    }
  }, [data]);

  return (
    <div>
      <Chart option={option} id="shop-count-chart" height={700} />
    </div>
  );
};

export default ShopCount;
