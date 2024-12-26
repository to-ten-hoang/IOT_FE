import { Row, Col } from 'antd';
import React from 'react';
import ProfileCard from "./ProfileCard";
import "./Profiles.scss";

function Profiles() {
  const profiles = [
    {
      id: 1,
      name: "Đặng Minh Anh",
      className: "D21CNPM04",
      studentId: "B21DCCN140",
      avatarUrl: "https://i.pinimg.com/originals/a4/ec/25/a4ec2589b6ec9b0883d3f84678890de2.jpg",
      coverUrl: "https://cdn.sgtiepthi.vn/wp-content/uploads/2022/08/295668626_2343891112417305_8394540339713625809_n.jpg",
      githubUrl: "https://github.com/Cmloopy?tab=repositories",
    },
    {
      id: 2,
      name: "Vũ Huy Hoàng",
      className: "D21CNPM1",
      studentId: "B21DCCN398",
      avatarUrl: "https://i.pinimg.com/564x/f1/43/64/f1436415a2a208043bdef80c73d66b4a.jpg",
      coverUrl: "https://img.pikbest.com/wp/202344/dramatic-sky-stunning-cinematic-sunset-a-natural-s-beautiful-and-texture-background_9903058.jpg!w700wp",
      githubUrl: "https://github.com/vuhuyhoang12abm",
    },
    {
      id: 3,
      name: "Nguyễn Hoàng Hải",
      className: "D21HTTT4",
      studentId: "B21DCCN319",
      avatarUrl: "https://i.ytimg.com/vi/2pcki4UiUDQ/hqdefault.jpg",
      coverUrl: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/473615Pmt/image-200-anh-hoang-hon-dep-buon-co-don-lang-man-cuc-chill-167642975045324.jpg",
      githubUrl: "https://github.com/HaiNguyen1910CN  ",
    },
  ];

  return (
    <div className="profiles-container">
      <Row gutter={16}>
        {profiles.map(profile => (
          <Col span={8} key={profile.id}>
            <ProfileCard
              name={profile.name}
              className={profile.className}
              studentId={profile.studentId}
              avatarUrl={profile.avatarUrl}
              coverUrl={profile.coverUrl}
              githubUrl={profile.githubUrl}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Profiles;
