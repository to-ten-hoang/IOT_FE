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
      avatarUrl: "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/404468562_1360735678150906_2227544323508199255_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEGKD7GtI4tObz6KOiQQnDciJV2oCqxvRyIlXagKrG9MJ4ANac2yX_G1ggidKlHZsFaXSZMXiuOVCJKW_5u9CU&_nc_ohc=p5oD1uq8_p8Q7kNvgFIkKmG&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=ARt7oRH_W-21N_VVenbEn3y&oh=00_AYBOxRdZjqFAc87uUKwc2SvCgQA_8BfbfY5SnJtrc4CFFg&oe=67276139",
      coverUrl: "https://www.baokontum.com.vn/uploads/Image/2023/05/07/173837pasted%20image%200.png",
      githubUrl: "https://github.com/vuhuyhoang12abm",
    },
    {
      id: 3,
      name: "Nguyễn Hoàng Hải",
      className: "D21HTTT4",
      studentId: "B21DCCN319",
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvoqBhdyuQaDaxBNyAeeLgxxGygL05RMuMCQ&s",
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
