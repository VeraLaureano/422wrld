import SongModel from '../models/Song.model'
import { Song } from '../interfaces/song.interface'

export const findAllSongs = async (pages: number, songsNumber: number, dataFind: object) => {
  // Calculate the number of documents to skip based on the current page and number of songs per page
  const skip = (pages - 1) * songsNumber

  // Find all songs that match the specified criteria, skipping the appropriate number of documents and limiting the results to the specified number of songs
  const responseSongs = await SongModel.find({...dataFind}).skip(skip).limit(songsNumber)

  // Return the response songs
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