// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import { getFormatDate_XLSX, importXlsx } from "@/utils/tools";
import { Button, Card, Col, Row, Upload } from "antd";
import { useEffect, useState } from "react";
import OldStatistics from "./Statistics";

const Old: React.FC = ({}) => {
  const [data, setData] = useState([]);

  const customUpload = async (option: any) => {
    importXlsx(option.file).then((data: any) => {
      setData(data || []);
    });
  };
  const [option, setOption] = useState<EChartsOption>({
    title: {
      text: "6月以上业务组数据",
    },
    // width: "95%",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      // splitLine: {
      //   show: true,
      // },
    },
    yAxis: {
      type: "value",
      // scale: true,
      max: function (value) {
        //取最大值向上取整为最大刻度
        // return  Math.ceil(value.max)

        return value.max + 30;
      },
    },
  });

  useEffect(() => {
    if (data && data.length) {
      let optionInfo: EChartsOption = JSON.parse(JSON.stringify(option));

      let nameList: any = [];
      let count: any = [];
      let dimension: any = ["成单金额", "毛利率", "订单数量", "讲师积分"];

      data.map((item: any) => {
        if (!nameList.includes(item["姓名"])) {
          nameList.push(item["姓名"]);
          count.push(item["总分"]);
        }
        // Object.keys(item).forEach((res: any) => {
        //   if (!dimension.includes(res)) {
        //     dimension.push(res);
        //   }
        // });
      });
      console.log(dimension);
      let newSeries: any = [];

      dimension.forEach((item: any) => {
        let list: any = [];
        nameList.forEach((res: any) => {
          list.push(data.filter((f: any) => f["姓名"] === res)[0][item] || 0);
        });
        let newInfo = {
          name: item,
          type: "bar",
          stack: "sum",
          label: {
            show: true,
            formatter: function (info: any) {
              if (item === "成单金额") {
                let amount = data.filter(
                  (item: any) => item["姓名"] === info.name
                )[0]["金额"];
                return amount ? `${info.data} (${amount || 0}万)` : info.data;
                // return data.filter((item:any)=> item["姓名"] === res)
              }
              // var res =  "{xing|} " + param.name
              return info.data;
            },
            // formatter: "{b}: {@score}",
          },
          emphasis: {
            focus: "series",
          },
          data: list,
        };
        newSeries.push(newInfo);
      });

      optionInfo.xAxis = {
        ...optionInfo.xAxis,
        type: "category",
        data: nameList,
      };

      optionInfo.series = newSeries;
      setOption(optionInfo);
    }
  }, [data]);

  return (
    // <div style={{ padding: 40 }}>
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Upload customRequest={customUpload} fileList={[]}>
          <Button type="primary">上传数据</Button>
        </Upload>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={18}>
            <Card>
              <Chart option={option} id="old-chart" />
            </Card>
          </Col>
          <Col span={6}>
            <OldStatistics data={data} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Old;
