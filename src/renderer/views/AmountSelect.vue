<template>
  <div class="container sub chage_list_wr">
    <div class="inner">
      <div class="contents-wr">
        <div class="top_hd">
          <div class="in">
            <router-link :to="{ name: 'main' }" class="home_bt">
              <i class="ui home icon"></i>
            </router-link>
            <div class="text">
              <strong>포인트 충전하기</strong>
              <span>필요하신 금액을 선택 후 결제해주세요</span>
            </div>
          </div>
        </div>
        <!-- top_hd -->

        <div class="my_info">
          <div class="my_phone">
            <span>나의 전화번호</span>
            <strong>{{ phoneNumber }}</strong>
          </div>
          <div class="my_point">
            <span>보유 포인트</span>
            <strong>{{ user.point | priceFormat }} P</strong>
          </div>
        </div>

        <div class="cash_list">
            <a
              v-for="p in products"
              :key="p"
              href="#"
              :class="{ on: selected === p }"
              @click="selected = p"
              
            >
              <div>
                <div class="price">
                  <strong class="title">충전</strong>
                  <strong><span class="num">{{ p | priceFormat}}</span> 원 </strong>
                </div>
                <div class="card_point point" v-if="options.isCard">
                  <span class="name">카드 추가적립({{ options.card / 100 | persentFormat }})</span>
                  <span class="num point2">{{ (options.card / 100) * p | priceFormat }}P</span>
                </div>
                <div class="coin_point point">
                  <span class="name">현금 추가적립({{ options.cash / 100 | persentFormat }})</span>
                  <span class="num point2">{{ (options.cash) / 100 * p | priceFormat }}P</span>
                </div>
              
              </div>
            </a>
        </div>

        <div class="bottom_btns">
          <div class="btns">
            <div class="in">
              <a
                href="#"
                class="back"
                @click="$router.push({ name: 'info', params: { type: 'pay' } })"
              >
                <i class="ui angle left icon"></i>
              </a>
              <a href="#" class="next" @click="wrap">{{ options.isCard ? '결제수단 선택하기' : '결제하기' }}</a>
            </div>
          </div>
        </div>
      </div>
      <!-- contents_wr -->

      <div class="ui basic modal qu_modal">
        <div class="text">
          <strong>
            선택하신 금액은
            <br />
            {{ selected | priceFormat }}원입니다
            <b>충전하시겠습니까?</b>
          </strong>
        </div>
        <div class="buttons">
          <a class="can">아니요</a>
          <a class="ok">네</a>
        </div>
      </div>

      <div class="wave-box-2">
        <div class="wave -one"></div>
        <div class="wave -two"></div>
        <div class="wave -three"></div>
      </div>
    </div>
    <!-- inner -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import numeral from 'numeral';

export default {
  name: 'AmountSelect',
  computed: {
    ...mapState('kiosk', ['user', 'options']),
    phoneNumber() {
      const [, , num3] = this.user.phone.split('-');

      return `010-****-${num3}`;
    },
  },
  data() {
    return {
      selected: 1000,
      products: [1000, 5000, 10000, 20000, 30000, 40000, 50000, 100000],
    };
  },
  methods: {
    wrap() {
      const { selected: amount } = this;
      const { isCard } = this.options;
      if (isCard) {
        this.$router.push({ name: 'payTypeSelect', params: { amount } });
      } else {
        this.$router.push({ name: 'payDetail', params: { amount, method: 'cash' } });
      }
    },
  },
  filters: {
    persentFormat(value) {
      return numeral(value).format('0%');
    },
  },
};
</script>