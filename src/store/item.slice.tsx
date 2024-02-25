import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IItem } from '../interfaces/item.interface'
import { $api } from '../api/api'

interface IValantisState {
    idsList: string[],
    itemList: IItem[],
    offset: number;
    selectFilterKey: string;
    searchText: string;
    loading: boolean,
    error: string | null
}

const initialState: IValantisState = {
    idsList: [],
    itemList: [],
    offset: 0,
    selectFilterKey: 'product',
    searchText: '',
    loading: false,
    error: null
}

const GET_PRODUCTS_IDS = 'get_ids'
const GET_PRODUCT_ITEMS = 'get_items'
const FILTER = 'filter'
const PAGE_SIZE = 50

export const getIds = createAsyncThunk(
    'getIds',
    async (params: { newSelectFilterKey: string, newSearchText: string, offset: number }, { dispatch }) => {
        const { newSearchText, offset } = params
        if (newSearchText.trim() === '') {
            const { data } = await $api.post('/', {
                action: GET_PRODUCTS_IDS,
                params: { offset, limit: PAGE_SIZE }
            })
            await dispatch(getItems(data.result))

            dispatch(setOffset(offset))
            dispatch(setSelectFilterKey('product'))
            dispatch(setSearchText(''))

            return data as { result: string[] }
        } else {
            dispatch(filter(params))
        }
    }
)

export const getItems = createAsyncThunk(
    'getItems',
    async (ids: string[]) => {
        const { data } = await $api.post('/', {
            action: GET_PRODUCT_ITEMS,
            params: { ids }
        })

        return data as { result: IItem[] }
    }
)

export const filter = createAsyncThunk(
    'filter',
    async (params: { newSelectFilterKey: string, newSearchText: string, offset: number }, { dispatch }) => {
        const { newSelectFilterKey, newSearchText, offset } = params

        let apiParams
        if (newSelectFilterKey === 'product') {
            apiParams = { product: newSearchText }
        } else if (newSelectFilterKey === 'price') {
            apiParams = { price: parseInt(newSearchText) }
        } else {
            apiParams = { brand: newSearchText }
        }

        const { data } = await $api.post('/', {
            action: FILTER,
            params: { ...apiParams, offset, limit: PAGE_SIZE }
        })

        await dispatch(getItems(data.result))

        dispatch(setSelectFilterKey(newSelectFilterKey))
        dispatch(setSearchText(newSearchText))

        return data as { result: string[] }
    }
)

export const itemSlice = createSlice({
    name: "itemSlice",
    initialState,
    reducers: {
        setOffset(state, action) {
            state.offset = action.payload
        },
        setSearchText(state, action) {
            state.searchText = action.payload
        },
        setSelectFilterKey(state, action) {
            state.selectFilterKey = action.payload
        },
        clear(state) {
            state.idsList = []
            state.itemList = []
        }
    },
    extraReducers: builder => builder
        .addCase(getIds.pending, state => {
            state.loading = true
        })
        .addCase(getIds.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload) {
                state.idsList = action.payload.result
            }
        })
        .addCase(getIds.rejected, state => {
            state.loading = false
            state.error = "Fetch failed..."
        })
        .addCase(getItems.pending, state => {
            state.loading = true
        })
        .addCase(getItems.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload) {
                const uniqueIds: { [key: string]: boolean } = {};
                state.itemList = action.payload.result.filter(({ id }) => {
                    if (!uniqueIds[id]) {
                        uniqueIds[id] = true;
                        return true;
                    }
                    return false;
                });
            }
        })
        .addCase(getItems.rejected, state => {
            state.loading = false
            state.error = "Fetch failed..."
        })
        .addCase(filter.pending, state => {
            state.loading = true
        })
        .addCase(filter.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload) {
                state.idsList = action.payload.result
            }
        })
        .addCase(filter.rejected, state => {
            state.loading = false
            state.error = "Fetch failed..."
        })
})

export const { setOffset, setSearchText, setSelectFilterKey, clear } = itemSlice.actions