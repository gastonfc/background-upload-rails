class UploadController < ApplicationController
  def index
     render :file => '/app/views/upload/uploadfile.rhtml'
  end

  def uploadFile
    saveFile(params[:upload])
    render :text => "File has been uploaded successfully"
  end

  def saveFile(upload)
    file = DataFile.save(upload['datafile'].original_filename, upload['datafile'].read)
  end
end
