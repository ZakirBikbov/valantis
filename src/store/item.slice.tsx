import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IItem } from '../interfaces/item.interface'
import { $api } from '../api/api'

interface IValantisState {
    idsList: string[],
    itemList: IItem[],
    offset: number;
    searchText: string;
    loading: boolean,
    error: string | null
}

const initialState: IValantisState = {
    idsList: [],
    itemList: [],
    offset: 0,
    searchText: '',
    loading: false,
    error: null
}

export const getIds = createAsyncThunk(
    'getIds',
    async (params: { newSearchText: string, offset: number }, { dispatch }) => {
        const { newSearchText, offset } = params
        if (newSearchText.trim() === '') {
            const { data } = await $api.post('/', {
                action: "get_ids",
                params: { offset, limit: 50 }
            })
            await dispatch(getItems(data.result))
            dispatch(setOffset(offset))
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
            action: 'get_items',
            params: { ids }
        })
        return data as { result: IItem[] }
    }
)

export const filter = createAsyncThunk(
    'filter',
    async (params: { newSearchText: string, offset: number }, { dispatch }) => {
        const { newSearchText, offset } = params
        let apiParams
        if (/[а-яА-ЯЁё]/.test(newSearchText)) {
            apiParams = { product: newSearchText }
        } else if (/^[0-9]+$/.test(newSearchText)) {
            apiParams = { price: parseInt(newSearchText) }
        } else {
            apiParams = { brand: newSearchText }
        }
        const { data } = await $api.post('/', {
            action: 'filter',
            params: apiParams
        })
        await dispatch(getItems(data.result))
        dispatch(setOffset(offset))
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
            console.log(state.itemList)
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

export const { setOffset, setSearchText } = itemSlice.actions