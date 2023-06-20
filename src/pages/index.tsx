// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import CountryProduct from "@/components/CountryProduct";
import Email from "@/components/Email";
import { importXlsx } from "@/utils/tools";
import { Button, Row, Col, Card, Upload } from "antd";
import { useState } from "react";

export default function HomePage() {
  const [data, setData] = useState([]);

  const customUpload = async (option: any) => {
    importXlsx(option.file).then((data: any) => {
      setData(data || []);
    });
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Upload customRequest={customUpload} fileList={[]}>
            <Button type="primary">上传数据</Button>
          </Upload>
        </Col>
        <Col span={24}>
          <Email data={data} />
        </Col>
        <Col span={24}>
          <CountryProduct data={data} />
        </Col>
      </Row>
    </div>
  );
}
