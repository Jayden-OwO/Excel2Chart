import { Card, Empty, Space } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Statistics.less";
import Icon, { HomeOutlined } from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import oneIcon from "../../../assets/1.png";
import twoIcon from "../../../assets/2.png";
import threeIcon from "../../../assets/3.png";

import { compare } from "@/utils/tools";
interface Props {
  data: any;
}

const OldStatistics: React.FC<Props> = ({ data }) => {
  const [list, setList] = useState([]);

  // const OneIcon = (props: Partial<CustomIconComponentProps>) => (
  //   <Icon component={<img src={oneIcon} />} {...props} />
  // );

  // const PandaIcon = (props: Partial<CustomIconComponentProps>) => (
  //   <Icon component={PandaSvg} {...props} />
  // );

  useEffect(() => {
    if (data && data.length) {
      let newData: any = [];
      console.log(data);
      data.forEach((item: any) => {
        newData.push({
          name: item["姓名"],
          value: item["总分"] || 0,
        });
      });
      newData = newData.sort(compare("value"));
      console.log(newData);
      setList(newData);
    }
  }, [data]);
  return (
    <Card style={{ height: "100%" }}>
      <div className={styles.box}>
        {!!list.length ? (
          list.map((item: any, index: number) => (
            <div className={styles.container} key={item.name}>
              <Space>
                <div className={styles["name-box"]}>
                  <div>{item.name}</div>
                  {index === 0 ? (
                    <img src={oneIcon} className={styles.icon} />
                  ) : index === 1 ? (
                    <img src={twoIcon} className={styles.icon} />
                  ) : index === 2 ? (
                    <img src={threeIcon} className={styles.icon} />
                  ) : null}
                </div>
              </Space>
              <div>{item.value}分</div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Empty />
          </div>
        )}
      </div>
    </Card>
  );
};

export default OldStatistics;
