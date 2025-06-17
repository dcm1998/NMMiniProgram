<template>
	<view>
		<evan-form ref="form" :model="form">
			<view class="cx-form--items" v-show="isShow(item)" v-for="(item, index) in option.items" :key="index">
				<evan-form-item :label="item.name" :prop="item.field" :labelPosition="item.labelPostion || 'left'" v-if="item.type != 'hidden'">
					<block v-if="item.type === 'input' || item.type === undefined">
						<u--input  :disabled="isDisabled(item)" :readonly="isReadonly(item)" v-model="form[item.field]" border="none" inputAlign="right" :placeholder="`请输入${item.name}`" @change="v => onItemChange(v, item, form)"></u--input>
					</block>
					<!--开关-->
					<block v-if="item.type === 'swtich'">
						<view class="flex align-center justify-end" style="width: 100%;">
							<u-switch :disabled="isReadonly(item)" :size="18" v-model="form[item.field]" @change="v => onItemChange(v, item, form)"></u-switch>
						</view>
					</block>
					<!--checkbox-->
					<block v-if="item.type === 'checkbox'">
						<view class="flex align-center justify-end" style="width: 100%;">
							<u-checkbox-group v-model="form[item.field]" placement="row" @change="v => onItemChange(v, item, form)">
								<u-checkbox v-for="(items, i) in getFuncOrList(item.items) || []" :key="i" :label="items.name" :name="items.name" :disabled="items.disabled || isCheckReadonly(item)"></u-checkbox>
							</u-checkbox-group>
						</view>
					</block>
					<!--单选-->
					<block v-if="item.type === 'radio'">
						<view class="flex align-end justify-end text-right" style="width: 100%;">
							<u-radio-group v-model="form[item.field]" placement="row" @change="v => onItemChange(v, item, form)">
								<u-radio v-for="(items, i) in getFuncOrList(item.items) || []" :key="i" :label="items.name" :name="items.name" :disabled="items.disabled || isCheckReadonly(item)"></u-radio>
							</u-radio-group>
						</view>
					</block>
					<!--textarea-->
					<block v-if="item.type === 'textarea'">
						<u--textarea :disabled="isReadonly(item)" v-model="form[item.field]" border="none" placeholder="请输入内容" autoHeight></u--textarea>
						</block>
					<block v-if="item.type === 'date'">
						<view class="flex align-end text-right" style="width: 100%;">
							<xy-date :disabled="isDisabled(item)" :readonly="isReadonly(item)" :format="item.format || 'YYYY-MM-DD'" @change="v => onItemHandle(v, item.field, item, form)" :value="form[item.field]"></xy-date>
						</view>
					</block>
					<block v-if="item.type === 'select'">
						<view class="flex align-end text-right" style="width: 100%;">
							<xy-select  :disabled="isDisabled(item)" :readonly="isReadonly(item)" :list="item.items" @change="v => onItemHandle(v, item.field, item, form)" :value="form[item.field]" :props="item.props"></xy-select>
						</view>
					</block>
					<block v-if="item.type === 'dict'">
						<view class="flex align-end text-right" style="width: 100%;">
							<xy-dict :format="item.format" :disabled="isDisabled(item)" :readonly="isReadonly(item)" :list="dict[item.format] || []" @change="v => onItemHandle(v, item.field, item, form)" :value="form[item.field]" :props="item.props"></xy-dict>
						</view>
					</block>
					<block v-if="item.type === 'multiSelector'">
						<view class="flex align-end text-right" style="width: 100%;">
							<xy-multi-selector
								:disabled="isDisabled(item)" 
								:readonly="isReadonly(item)"
								:list="item.items"
								@change="v => onItemHandle(v, item.field, item, form)"
								:value="form[item.field]"
								:props="item.props"
								:level="item.level || 2"
							></xy-multi-selector>
						</view>
					</block>
					<block v-if="item.type === 'upload'">
						<view class="flex align-end text-right" style="width: 100%;">
							<xy-upload
								:disabled="isDisabled(item)" 
								:readonly="isReadonly(item)"
								:limit="item.limit"
								:value="form[item.field]"
								:bizType="item.bizType"
								@change="v => onItemHandle(v, item.field, item, form)"
							></xy-upload>
						</view>
					</block>
					<slot
						:name="item.name"
						:item="item"
						:form="form"
						:readonly="readonly"
						v-if="item.type == 'slot'"
					></slot>
				</evan-form-item>
				 
			</view>
		</evan-form>
	</view>
</template>

<script>
import EvanForm from './modules/evan-form/evan-form';
import EvanFormItem from './modules/evan-form-item/evan-form-item';
import XyDate from './components/date';
import XySelect from './components/select';
import utils from 'xe-utils';
import XyDict from './components/dict'
import XyMultiSelector from './components/multiSelector';
import XyUpload from './components/upload'
import dayjs from 'dayjs';
import dict from './mock/dict'
export default {
	components: {
		EvanForm,
		EvanFormItem,
		XyDate,
		XySelect,
		XyMultiSelector,
		XyDict,
		XyUpload
	},
	props: {
		// 主体内容 包含rules(规则), items(表单内容),
		option: Object,
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			rules: {},
			form: {},
			dict: {}
		};
	},
	mounted() {
		// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
		this.$refs.form.setRules(this.option.rules || this.rules);
		this.initForm();
	},
	methods: {
		hideKeyboard() {
			uni.hideKeyboard();
		},
		// 判断是否有默认值
		getDefault(d) {
			if (typeof d == 'function') {
				return d();
			} else {
				return d == undefined ? null : d;
			}
		},
		// 判断是否展示
		isShow(item) {
			let b = false;
			if (typeof item.show == 'function') {
				// debugger
				b = item.show({ form: this.form });
			} else if (typeof item.show === 'boolean') {
				debugger;
				b = item.show;
			} else {
				// debugger
				b = true;
			}
			if (!b) {
				this.form[item.field] = undefined;
			}
			return b;
		},
		isDisabled(item) {
			if (typeof item.disabled == 'boolean') {
				return item.disabled;
			} else if (typeof item.disabled == 'function') {
				return item.disabled();
			}
		},
		// 针对单选和多选进行判断是否可选
		isCheckReadonly(item) {
			if (typeof item.readonly == 'boolean') {
				return item.readonly;
			} else if (typeof item.readonly == 'function') {
				return item.readonly(item, this.form);
			} else if (typeof item.disabled == 'boolean') {
				return item.disabled;
			} else if (typeof item.disabled == 'function') {
				return item.disabled(item, this.form);
			} else {
				return this.readonly;
			}
		},
		onItemHandle(v, itemKey, item, form) {
			this.form[itemKey] = v;
			this.$emit('change', v, item, form);
			if (item.handle) {
				item.handle(v, form);
			}
		},
		onItemChange(v, item, form) {
			this.$emit('change', v, item, form);
			if (item.handle) {
				item.handle(v, item, form);
			}
		},
		// 表单序列化
		setForm(form) {
			this.initForm();
			this.source = JSON.parse(JSON.stringify(form));
			this.option.items.forEach(item => {
				if (item.type == 'date') {
					this.form[item.field] = item.format ? dayjs(this.getFieldValue(form, item)).format(item.format) : null;
				} else {
					this.form[item.field] = this.getFieldValue(form, item);
				}
			});
			if (this.$refs.rich) {
				this.$refs.rich.forEach(ref => {
					ref.update();
				});
			}
			this.formData = JSON.parse(JSON.stringify(this.form));
		},
		updateForm(form) {
			utils.assign(this.form, form);
			if (this.$refs.rich) {
				this.$refs.rich.forEach(ref => {
					ref.update();
				});
			}
		},
		// 塞入form表单
		getForm() {
			const form = {};
			this.option.items.forEach(item => {
				if (item.type == 'date' && this.form[item.field]) {
					utils.set(form, item.set || item.field, dayjs(this.form[item.field]).format(item.format || 'YYYY-MM-DD'));
					// utils.set(form, item.set || item.field, days(this.form[item.field], item.format || 'YYYY-MM-DD'));
				} else {
					utils.set(form, item.set || item.field, this.form[item.field]);
				}
			});
			return form;
		},
		getFieldValue(form, item) {
			if (item.transform || item.get) {
				if (typeof item.get == 'function') {
					return item.get(form);
				}
				return utils.get(form, item.transform || item.get);
			} else {
				if (item.type == 'number' && form[item.field] == null) {
					return undefined;
				} else if (item.type == 'checkbox' || (item.type === 'multiSelector' && form[item.field] == null)) {
					return [];
				}

				return form[item.field];
			}
		},
		getFuncOrList(items) {
			if (typeof items == 'function') {
				return items();
			} else {
				return items;
			}
		},
		// 判断只读模式
		isReadonly(item) {
			if (typeof item.readonly == 'boolean') {
				return item.readonly;
			} else if (typeof item.readonly == 'function') {
				return item.readonly(item, this.form);
			} else {
				return this.readonly;
			}
		},
		// 初始化表单
		initForm() {
			const form = {};
			this.option.items.forEach(item => {
				form[item.field] = this.getDefault(item.default);
				// 字典查询 项目中该未接口数据/渲染
				if (item.type == "dict" && item.format) {
				if (
					!this.dict[item.format] &&
					Object.prototype.toString.call(item.format).indexOf("String") != -1
				) {
					this.$set(this.dict, item.format, dict[item.format])
					}
				}else if (item.type === 'checkbox' || item.type === 'multiSelector') {
					form[item.field] = item.default ? this.getDefault(item.default) : [];
				}
			});
			this.form = form;
		},
		// 表单校验
		validate(rule = true) {
			return new Promise((resolve, reject) => {
				if (rule) {
					this.$refs.form.validate(res => {
						if (res) {
							resolve(this.getForm());
						}
					});
				} else {
					resolve(this.getForm());
				}
			});
		}
	}
};
</script>

<style></style>
