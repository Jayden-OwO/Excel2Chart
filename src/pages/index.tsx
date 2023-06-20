// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import CountryCount from "@/components/CountryCount";
import CountryProduct from "@/components/CountryProduct";
import Email from "@/components/Email";
import EmailHandleCount from "@/components/EmailHandleCount";
import ProductProportion from "@/components/ProductProportion";
import SaleManProduct from "@/components/SalemanProduct";
import ShopCount from "@/components/ShopCount";
import { importXlsx } from "@/utils/tools";
import { Button, Row, Col, Card, Upload } from "antd";
import { useEffect, useState } from "react";

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
          <Card>
            <Email data={data} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <CountryProduct data={data} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <SaleManProduct data={data} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <EmailHandleCount data={data} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <ProductProportion data={data} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <CountryCount data={data} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <ShopCount data={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
