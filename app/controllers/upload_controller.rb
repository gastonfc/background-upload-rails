class UploadController < ApplicationController
  def index
     render :file => '/app/views/upload/uploadfile.rhtml'
  end

  def uploadFile

    saveFiles(params[:upload] || params)

    respond_to do |format|
      format.html { render text: "File has been uploaded successfully" }
      format.js { }
      format.json { render json: "File was created", status: :created }
    end
    #if remotipart_submitted?
      #puts "Remotipart submitted"
    #else
      #puts "Clasico submit"
      #render :text => "File has been uploaded successfully"
    #end
  end

  def saveFiles(upload)
    datafile = upload['datafile']
    if datafile.is_a?(Array)
      @files = datafile.map { |df| DataFile.save(df.original_filename, df.read) }
    else
      @files = [DataFile.save(datafile.original_filename, datafile.read)]
    end
  end
end
