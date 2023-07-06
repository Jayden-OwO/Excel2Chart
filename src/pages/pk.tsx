// import { importXlsx } from "utils/excel2json";
import Chart, { EChartsOption } from "@/components/Chart";
import CountryCount from "@/components/CountryCount";
import CountryProduct from "@/components/CountryProduct";
import Email from "@/components/Email";
import EmailHandleCount from "@/components/EmailHandleCount";
import New from "@/components/PK/New";
import Old from "@/components/PK/Old";
import OldStatistics from "@/components/PK/Old/Statistics";
import Supervisor from "@/components/PK/Supervisor";
import SupervisorStatistics from "@/components/PK/Supervisor/Statistics";
import ProductProportion from "@/components/ProductProportion";
import SaleManProduct from "@/components/SalemanProduct";
import ShopCount from "@/components/ShopCount";
import { importXlsx } from "@/utils/tools";
import { Button, Row, Col, Card, Upload } from "antd";
import { useEffect, useState } from "react";

export default function PKPage() {
  const [data, setData] = useState([]);

  const customUpload = async (option: any) => {
    importXlsx(option.file).then((data: any) => {
      setData(data || []);
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Supervisor />
        </Col>
        <Col span={24}>
          <Old />
        </Col>
        <Col span={24}>
          <New />
        </Col>

        {/* <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={18}>
              <Card>
                <Old data={data} />
              </Card>
            </Col>
            <Col span={6}>
              <OldStatistics data={data} />
            </Col>
          </Row>
        </Col> */}
      </Row>
    </div>
  );
}
