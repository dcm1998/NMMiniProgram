<!--
 * @Author: WUYuHan
 * @Date: 2025-06-03 13:21:48
 * @LastEditTime: 2025-06-10 09:38:01
 * @Description: 运单统计详情
-->

<template>
    <view class="template-order">
        <cu-custom bgImage="https://xcy-img.icv-ip.com:1443/upload/parkingManage/2025-06-10/1749519462959111.png"
            :isBack="true">
            <block slot="content">运单统计详情</block>
        </cu-custom>

        <view class="order-wrap">
            <view class="header_steps">
            </view>
            <view class="order-position">
                <view class="waybill_header">
                    <view class="header_box"></view>
                    <view class="header_text">
                        <view class="text">运单号</view>
                        <view class="number">0001</view>
                    </view>
                    <view class="header_status">常规运单</view>
                </view>
                <view class="order_place">
                    <view class="start_place">
                        <view class="status">发</view>
                        <view class="place">
                            <view class="header">始发地</view>
                            <view class="text">西安市未央区凤城二路帝国大厦A座8234室</view>
                        </view>
                        <view class="dashed_line"></view>
                    </view>
                    <view class="dashed-line-vertical"></view>
                    <view class="end_place">
                        <view class="status">收</view>
                        <view class="place">
                            <view class="header">目的地</view>
                            <view class="text">西安市未央区凤城二路帝国大厦A座8234室</view>
                        </view>
                    </view>
                </view>
                <view class="floot">
                    <view class="input">
                        <view class="title">运输量</view>
                        <view class="content">122,000kg</view>
                    </view>
                    <view class="input">
                        <view class="title">运输时间</view>
                        <view class="content">2025/05/05 12:00:00</view>
                    </view>
                    <view class="input">
                        <view class="title">煤炭种类</view>
                        <view class="content">精品蜂窝煤</view>
                    </view>
                </view>
            </view>
            <view class="vehicle_content">
                <view class="waybill_header">
                    <view class="header_box"></view>
                    <view class="header_text">
                        <view class="text">执行车辆</view>
                    </view>
                    <view class="header_status">3辆</view>
                </view>
                <view class="cell_box">
                    <view class="item_cell">
                        <view class="title">编队位置</view>
                        <view class="input">领航车</view>
                    </view>
                    <view class="item_cell">
                        <view class="title">司机</view>
                        <view class="input">张三</view>
                    </view>
                    <view class="item_cell">
                        <view class="title">集装箱编号</view>
                        <view class="input">UESU3002469</view>
                    </view>
                    <view class="item_cell">
                        <view class="title">车牌号</view>
                        <view class="input">陕A·55555</view>
                    </view>
                    <view class="item_cell">
                        <view class="title">卸货单</view>
                        <view class="input">领航车</view>
                    </view>
                    <view class="item_cell">
                        <view class="title">车牌号</view>
                        <view class="input">领航车</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getNoticeList, cancelReserve } from '@/api/notice'
export default {
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.template-order {
    .tabs-swiper {
        font-weight: 500;
        font-size: 28rpx;
        color: #2a304a;
        line-height: 39rpx;
        padding-bottom: 20rpx;
    }

    .order-wrap {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 188rpx - 120rpx);
        width: 100%;
        align-items: center;

        .header_steps {
            width: 702rpx;
            height: 188rpx;
            background: #FFFFFF;
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            margin-bottom: 24rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .order-position {
            //   width: 92%;
            width: 702rpx;
            height: 700rpx;
            background: #FFFFFF;
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            padding: 24rpx;


            .order_place {
                width: 100%;
                height: 320rpx;
                position: relative;
                margin-top: 16rpx;

                .start_place {
                    width: 100%;
                    height: 50%;
                    display: flex;
                    position: relative;

                    .status {
                        width: 44rpx;
                        height: 44rpx;
                        background: #FF4141;
                        border-radius: 44rpx 44rpx 44rpx 44rpx;
                        color: #ffff;
                        text-align: center;
                        font-size: 24rpx;
                        line-height: 44rpx;
                    }

                    .place {
                        width: calc(100% - 44rpx);
                        height: 100%;
                        padding: 0 15rpx 15rpx 15rpx;
                        font-family: PingFang SC, PingFang SC;

                        .header {
                            font-weight: 400;
                            font-size: 32rpx;
                            color: #000000;
                        }

                        .text {
                            font-weight: 400;
                            font-size: 32rpx;
                            color: #666666;
                            text-align: left;
                            margin-top: 16rpx;
                        }
                    }

                    .dashed_line {
                        position: absolute;
                        left: 10%;
                        bottom: 0;
                        width: 90%;
                        height: 2rpx;
                        border-bottom: 2rpx dashed #ccc;
                    }
                }

                .dashed-line-vertical {
                    position: absolute;
                    height: 100rpx;
                    left: 20rpx;
                    top: 54rpx;
                    bottom: 0;
                    width: 2rpx;
                    border-left: 2rpx dashed #ccc;
                }

                .end_place {
                    width: 100%;
                    height: 50%;
                    display: flex;
                    padding-top: 16rpx;

                    .status {
                        width: 44rpx;
                        height: 44rpx;
                        background: rgba(21, 98, 191, 1);
                        border-radius: 44rpx 44rpx 44rpx 44rpx;
                        color: #ffff;
                        text-align: center;
                        font-size: 24rpx;
                        line-height: 44rpx;
                    }

                    .place {
                        width: calc(100% - 44rpx);
                        height: 100%;
                        padding: 0 15rpx 15rpx 15rpx;
                        font-family: PingFang SC, PingFang SC;

                        .header {
                            font-weight: 400;
                            font-size: 32rpx;
                            color: #000000;
                        }

                        .text {
                            font-weight: 400;
                            font-size: 32rpx;
                            color: #666666;
                            text-align: left;
                            margin-top: 16rpx;
                        }
                    }
                }
            }

            .floot {
                .input {
                    width: 100%;
                    height: 70rpx;
                    background: #F6F6F6;
                    border-radius: 8rpx 8rpx 8rpx 8rpx;
                    padding: 16rpx 24rpx;
                    display: flex;
                    justify-content: space-between;
                    font-weight: 400;
                    font-size: 28rpx;
                    font-family: PingFang SC, PingFang SC;
                    margin-top: 16rpx;

                    .title {
                        color: #666666;
                        width: 160rpx;
                    }

                    .content {
                        font-weight: 400;
                        color: #000000;
                        line-height: 38rpx;
                        text-align: right;
                    }
                }
            }

        }

        .vehicle_content {
            width: 702rpx;
            // height: 200rpx;
            background: #FFFFFF;
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            padding: 24rpx;
            margin-top: 24rpx;

            .cell_box {
                margin-top: 16rpx;
                width: 654rpx;
                height: 628rpx;
                background: #F6F6F6;
                border-radius: 8rpx 8rpx 8rpx 8rpx;
                border: 2rpx solid #1562BF;
                padding: 8rpx 24rpx;

                .item_cell {
                    display: flex;
                    justify-content: space-between;
                    height: 102rpx;
                    border-bottom: 1rpx solid #E2E2E2;
                    line-height: 102rpx;

                    .title {}

                    .input {}
                }
            }

        }
    }
}


.waybill_header {
    width: 100%;
    height: 50rpx;
    display: flex;
    align-items: center;

    .header_box {
        width: 8rpx;
        height: 28rpx;
        background: #1562BF;
        margin-right: 8rpx;
    }

    .header_text {
        display: flex;

        .text {
            font-family: PingFang SC, PingFang SC;
            font-weight: 600;
            font-size: 36rpx;
            color: #000000;
            font-style: normal;
            text-transform: none;
        }

        .number {
            width: 108rpx;
            height: 50rpx;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 36rpx;
            color: #1562BF;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-left: 16rpx;
        }
    }

    .header_status {
        // width: 128rpx;
        height: 50rpx;
        background: #1562BF;
        padding: 1rpx 24rpx;
        border-radius: 64rpx 64rpx 64rpx 64rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 50rpx;
        cursor: pointer;
        margin-left: auto;
    }
}

.cell-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;

    .name {
        font-size: 28rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        color: #212121;
        width: 220rpx;
        line-height: 44rpx;

        image {
            width: 36rpx;
            height: 36rpx;
            margin-right: 8rpx;
        }
    }

    .btn {
        border-color: transparent;
        background-color: none !important;
        width: 100rpx !important;
        height: 100rpx !important;
        border-radius: 50% !important;
        padding: 0;
        margin: initial;
        background: transparent;
    }

    .cell-items {
        color: #c0c4cc;
        font-size: 30rpx;
    }
}
</style>
