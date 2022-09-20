import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về bệnh viện
        </div>

        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/8TszjrFJOe0"
              title="Mùa Mưa Ngâu Nằm Cạnh - Vũ. (Original)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Điều đau khổ nhất không nằm ở những câu chuyện bạn phải chịu đựng
              mà là bạn phải tiếp tục sống một cuộc sống bình thường khi mọi thứ
              bên trong gần như vỡ vụn. Bạn chỉ muốn yếu đuối, muốn khóc đến nỗi
              đôi mắt sưng to và không ngừng đau đớn nhưng bạn lại rửa mặt sạch
              sẽ, trang điểm để che đi những mệt mỏi, che đi những giọt nước mắt
              của tối đêm qua. Và bạn bắt buộc phải tươi vui, phải như chưa từng
              có những đớn đau trong lòng. Bạn chỉ muốn ngủ vùi để quên đi những
              mất mát, những khó chịu nhưng bạn phải bước ra đối diện với ánh
              nắng mặt trời, đối diện với trách nhiệm cuộc sống, đối diện với
              nỗi đau.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.user.isLoggedIn };
};
const mapDispatchToProps = (dispatch) => {
  return;
  {
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
