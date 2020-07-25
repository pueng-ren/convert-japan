import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import axios from 'axios';


export default class Convert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'katakana',
      textInput: null,
      text: null
    }
    this.handleInputChange.bind(this);

  }



  handleInputChange = (event) => {
    const target = event.target;
    const value = target.name === 'lang' ? event.target.value : target.value;
    const name = target.name;
    console.log(name)
    this.setState({
      [name]: value
    }, console.log(this.state));
  }

  renderTranslate() {
    const { text, lang } = this.state
    return (
      <div>
        <p>
          ภาษา : {lang}
        </p>
        <textarea as="textarea" rows="5" className="box" style={{ padding: 5, fontSize: 18 }} name="text" value={text} readOnly />

      </div>
    )
  }

  onSubmit = async event => {
    event.preventDefault()

    const { textInput, lang } = this.state
    if (textInput === '' || textInput === null) {
      alert('กรุณาเติมประโยคที่ต้องการจะแปล')
    }

    const sent =
    {
      "app_id": "875eab4dbf741f5e15593cdc8c2a6bb7590d0440764911422f8e04f028d7b28a",
      "request_id": "record003",
      "sentence": textInput,
      "output_type": lang
    }

    console.log(sent)
    const PROXY_URL = 'http://localhost:51094';
    const URL = 'https://labs.goo.ne.jp/api/hiragana';
    try {
      const tranlate = await axios.post(URL, sent)
      this.setState({ text: tranlate.data.converted })
    } catch (err) {
      alert("มีข้อผิดพลาด กรุณาแจ้งสนผ.ด้วย")
      console.log(err)
    }
  }

  render() {
    const { textInput, lang, text } = this.state
    return (
        <Container style={{ paddingLeft: '30%', paddingRight: '30%' }}>
          <Form onSubmit={this.onSubmit}>
            <h2>FROM NATTY [TESTER]</h2>
            <h3>สำหรับใช้ test ในการแปลภาษาญี่ปุ่นเท่านั้น </h3>
            <Row >
              <hr style={{ marginTop: '5%', marginBottom: '5%', marginLeft: '2%', marginRight: '2%' }} />
              <Col xs={6}>
                <p>เลือกภาษา</p>
                <select name="lang" value={lang} onChange={this.handleInputChange} className="box" style={{ padding: 5, fontSize: 18 }} >
                  <option value="katakana">katakana</option>
                  <option value="hiragana">hiragana</option>
                </select>

                <textarea as="textarea" rows="5" className="box" style={{ padding: 5, fontSize: 18, marginTop: '5%' }} name="textInput" onChange={this.handleInputChange} value={textInput} />
                <Button variant="success" type="submit" style={{ marginTop: '3%', marginBottom: '3%' }}>แปลภาษา</Button>
              </Col>
              <Col xs={6}>
                {
                  text ? this.renderTranslate() : null
                }

              </Col>


            </Row>


          </Form>
        </Container>

    );
  }
}
