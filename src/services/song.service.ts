import SongModel from '../models/Song.model'
import { Song } from '../interfaces/song.interface'

export const findAllSongs = async (pages: number, songsNumber: number, dataFind: object) => {
  const skip = (pages - 1) * songsNumber

  const responseSongs = await SongModel.find({...dataFind}).skip(skip).limit(songsNumber)
  return responseSongs
}

export const findOneSong = async (songID: string) => {
  const responseSong = await SongModel.findById({_id: songID})
  return responseSong
}

export const createSong = async (data: Song) => {
  const responseSong = await SongModel.create(data)
  return responseSong
}

export const findAndUpdateSong = async (songID: string, data: Song) => {
  const responseSong = await SongModel.findOneAndUpdate({ _id: songID }, data, {new: true})
  return responseSong
}

export const findAndDeleteSong = async (songID: string) => {
  const responseSong = await SongModel.findByIdAndDelete({_id: songID})
  return responseSong
}