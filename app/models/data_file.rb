class DataFile < ActiveRecord::Base
  def self.save(name, content)
    # name = upload['datafile'].original_filename
    directory = 'public/data'

    path = File.join(directory, name)

    File.open(path, "wb") { |f| f.write(content) }
  end
end
