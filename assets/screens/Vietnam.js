import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { List, Headline, Caption, Button } from 'react-native-paper';
import Axios from 'axios'
import URL from '../api/url'
import { ScrollView } from 'react-native-gesture-handler';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      confirmed: '',
      confirmed_diff: '',
      deaths: '',
      deaths_diff: '',
      recovered: '',
      recovered_diff: '',
      refreshing: true,
      antiCOVID: [
        {
          step: 1,
          stepColor: '#523906',
          content: 'Không đến vùng có dịch, hạn chế đến nơi đông người',
          contentColor: '#62760c'
        },
        {
          step: 2,
          stepColor: '#322f3d',
          content: 'Hạn chế tiếp xúc trực tiếp với người bệnh đường hô hấp cấp tính (sốt, ho, khó thở)',
          contentColor: '#4b5d67'
        },
        {
          step: 3,
          stepColor: '#1b1c25',
          content: 'Che miệng, mũi khi ho và hắt hơi',
          contentColor: '#1f4068'
        },
        {
          step: 4,
          stepColor: '#838383',
          content: 'Vệ sinh các nhân thường xuyên',
          contentColor: '#d9adad'
        },
        {
          step: 5,
          stepColor: '#1b1c25',
          content: 'Thông báo ngay khi có dấu hiệu sốt, ho, khó thở để được tư vấn, khám và điều trị kịp thời',
          contentColor: '#1f4068'
        },
        {
          step: 6,
          stepColor: '#be5683',
          content: 'Chỉ sử dụng thực thẩm nấu chín để đảm bảo an toàn thực thẩm',
          contentColor: '#ffe4e4'
        },
        {
          step: 7,
          stepColor: '#221f3b',
          contentColor: '#6f4a8e',
          content: 'Không mua bán, tiếp xúc với các loài động vật hoang dã'
        },
        {
          step: 8,
          stepColor: '#251f44',
          contentColor: '#d3dbff',
          content: 'Tăng cường thông khí khu vực nhà ở'
        },
        {
          step: 9,
          stepColor: '#423144',
          contentColor: '#cf1b1b',
          content: 'Vệ sinh nơi ở, cơ quan, trường học, xí nghiệp, nhà máy'
        },
        {
          step: 10,
          stepColor: '#0f4c75',
          contentColor: '#bbe1fa',
          content: 'Giữ ấm cho cơ thể, tăng cường sức khoẻ bằng cách sinh hoạt hợp lý (ăn uống, nghỉ ngơi và luyện tập thể thao)'
        }
      ],
      thongBao: [
        {
          id: 1,
          tieuDe: 'Thông báo khẩn cấp ngày 29-07',
          tomTat: 'Bộ y tế đề nghị những người đã đến địa điểm sau đến ngay cơ quan Y Tế'
        },
        {
          id: 2,
          tieuDe: 'Các bước phòng chống dịch hiệu quả',
          tomTat: 'Để đảm bảo an toàn cho bản thân và cho những người xung quanh. Yêu cầu mỗi người dân có ý thức trách nhiệm tuân thủ các biện pháp phòng chống...'
        },
        {
          id: 2,
          tieuDe: `Nữ bệnh nhân COVID-19 trốn viện với lý do "không tiện nói"`,
          tomTat: 'Chiều 29-7, chính quyền TP.HCM đã tổ chức họp báo thông tin về tình hình dịch COVID-19 và công tác ứng phó của TP dưới sự chủ trì của Sở Thông tin và truyền thông và Sở Y tế TP.HCM.'
        },
        {
          id: 2,
          tieuDe: `Tại sao Việt Nam chiến thắng dịch COVID-19?`,
          tomTat: 'Phát biểu trước Quốc hội ngày 13/6, Phó Thủ tướng Vũ Đức Đam cho biết, dân số Việt Nam đông nhưng cả nước ghi nhận 333 ca nhiễm (tính đến hết sáng 13/6), chưa có ca tử vong, chỉ còn 10 người đang điều trị. Đã qua 58 ngày, Việt Nam không có ca lây nhiễm COVID-19 trong cộng đồng.'
        }
      ]
    };
  }

  _getReportByRegion = async (ISO) => {
    await Axios.get(`${URL}/reports?iso=${ISO}`)
      .then(res => {
        console.log(`Trang thai: ` + res.status)
        this.setState({
          date: res.data.data[0].date,
          confirmed: res.data.data[0].confirmed,
          confirmed_diff: res.data.data[0].confirmed_diff,
          deaths: res.data.data[0].deaths,
          deaths_diff: res.data.data[0].deaths_diff,
          recovered: res.data.data[0].recovered,
          recovered_diff: res.data.data[0].recovered_diff,
          refreshing: false
        })
      })
  }

  renderItemAntiCovidView = ({item}) =>
    <View style={{
      height: 130,
      width: 250,
      marginRight: 5,
      borderRadius: 5,
      flexDirection: 'row',
      backgroundColor: `${item.contentColor}`
    }}>
      <View style={{
        height: 130,
        width: 55,
        backgroundColor: `${item.stepColor}`,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center'
      }}>
        <Text style={{
          color: '#FFF',
          fontSize: 45,
          fontWeight: '900',
          alignSelf: 'center'
        }}>{item.step}</Text>
      </View>

      <View style={{
        height: 130,
        width: 195,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center'
      }}>
        <Text style={{
          color: '#FFF',
          fontSize: 20,
          alignSelf: 'center',
          textAlign: 'center',
          margin: 10
        }}>{item.content}</Text>
      </View>
    </View>

  renderItem = ({ item }) =>
    <List.Item
      title={item.tieuDe}
      description={item.tomTat}
      left={() => <List.Icon icon='alarm-light-outline' color='red' />}
      style={{
        borderRadius: 10,
        backgroundColor: '#FFF',
        marginVertical: 5
      }}
    />

  componentDidMount() {
    this._getReportByRegion('VNM')
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 10 }}>
        <StatusBar barStyle='dark-content' />
        <Text style={{
          marginTop: 70,
          fontSize: 30,
          fontWeight: 'bold',
          color: 'grey'
        }}>THÔNG TIN DỊCH BỆNH</Text>
        {
          this.state.refreshing
            ?
            <View style={{ height: 110, width: '100%', justifyContent: 'center' }} >
              <ActivityIndicator size='small' color='#000' />
            </View>
            :
            <View style={{ marginVertical: 10 }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                {/* Nhiem benh */}
                <View style={
                  [styles.box, { backgroundColor: `#ffe0ac`, }]
                }>
                  <View style={{
                    height: 36,
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.text}>{this.state.confirmed}</Text>
                  </View>

                  <View style={{
                    height: 36,
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.text}>Nhiễm Bệnh</Text>
                  </View>

                  <View style={
                    [styles.boxChild, { backgroundColor: '#f6d743' }]
                  }>
                    <Text style={styles.text}>+{this.state.confirmed_diff}</Text>
                  </View>
                </View>

                {/* Tu vong */}
                <View style={
                  [styles.box, { backgroundColor: `#ff847c`, }]
                }>
                  <View style={{
                    height: 36,
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.text}>{this.state.deaths}</Text>
                  </View>

                  <View style={{
                    height: 36,
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.text}>Tử Vong</Text>
                  </View>

                  <View style={
                    [styles.boxChild, { backgroundColor: '#9a1f40' }]
                  }>
                    <Text style={styles.text}>+{this.state.deaths_diff}</Text>
                  </View>
                </View>

                {/* Binh phuc */}
                <View style={
                  [styles.box, { backgroundColor: `#99b898`, }]
                }>
                  <View style={{
                    height: 36,
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.text}>{this.state.recovered}</Text>
                  </View>

                  <View style={{
                    height: 36,
                    justifyContent: 'center'
                  }}>
                    <Text style={styles.text}>Bình Phục</Text>
                  </View>

                  <View style={
                    [styles.boxChild, { backgroundColor: '#12947f' }]
                  }>
                    <Text style={styles.text}>+{this.state.recovered_diff}</Text>
                  </View>
                </View>
              </View>
            </View>
        }
        <Caption>Cập nhật {this.state.date}</Caption>
        <View style={{
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'space-evenly'
        }}>
          <Button mode='contained'>KHAI BÁO Y TẾ</Button>
          <Button mode='contained'>HƯỚNG DẪN PHÒNG DỊCH</Button>
        </View>

        <Caption>Phòng chống COVID</Caption>
        <View style={{
          marginVertical: 10
        }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.antiCOVID}
            keyExtractor={(item) => item.step}
            renderItem={this.renderItemAntiCovidView}
          />
        </View>
        <Caption>Tin nóng trong ngày</Caption>
        <View
          style={{
            marginVertical: 10,
            height: '100%'
          }}
        >
          <FlatList
            data={this.state.thongBao}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    fontSize: 20
  },
  box: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxChild: {
    height: 36,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})