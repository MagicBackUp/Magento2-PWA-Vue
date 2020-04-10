import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { I18n, AddressType } from '@helper/interface'

@Component({
    name: 'v-views'
})
export default class VViews extends Vue {
    public i18n: I18n = {
        shippingStep: 'Shipping Step',
        shippingAddress: 'Shipping Address',
        paymentMethod: 'Payment Method',
        orderReview: 'Order Review',
        firstname: 'Firstname',
        lastname: 'Lastname',
        phone: 'Phone'
    }
    public shippingAddress: AddressType = {
        firstname: '',
        lastname: '',
        phone: '',
        country: '',
        state: '',
        address: [],
        city: '',
        zipcode: ''
    }

    protected render (h: CreateElement) {
        return (
            <div class="in-steps">
                <h1 class="title">{this.i18n.shippingStep}</h1>
                <v-steps type="is-black">
                    <v-step-item label={this.i18n.shippingAddress} icon="account-key">
                        <form class="in-address">
                            <h2>{this.i18n.shippingAddress}</h2>
                            <div class="v-row">
                                <label>{this.i18n.firstname}</label>
                                <v-input name="firstname" vModel={this.shippingAddress.firstname}></v-input>
                            </div>
                            <div class="v-row">
                                <label>{this.i18n.lastname}</label>
                                <v-input name="lastname" vModel={this.shippingAddress.lastname}></v-input>
                            </div>
                            <div class="v-row">
                                <label>{this.i18n.phone}</label>
                                <v-input name="phone" vModel={this.shippingAddress.phone}></v-input>
                            </div>
                        </form>
                    </v-step-item>
                    <v-step-item label={this.i18n.paymentMethod} icon="account">456</v-step-item>
                    <v-step-item label={this.i18n.orderReview} icon="account-plus">789</v-step-item>
                </v-steps>
            </div>
        )
    }
}