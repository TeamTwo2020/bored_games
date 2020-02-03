import java.sql.*;

public class DatabaseFunctions{
    public static void main(String[] args){
        try {
            /*
            String myDriver = "org.gjt.mm.mysql.Driver";
            String myUrl = "cs.ucc.ie";
            Class.forName(myDriver);
            Connection conn = DriverManager.getConnection(myUrl, "cgg1", "2021_cgg1");

            String query = "SELECT * FROM eng_words WHERE word='prodigy'";

            Statement st = conn.createStatement();
            */

            // jdbc:mysql://cs.ucc.ie:3306/2021_cgg1
            Context context = InitialContext();
            DataSource dataSource = (DataSource) context.lookup("java:comp/env/jdbc/myDB");
            MysqlDataSource dataSource = new MysqlDataSource();
            dataSource.setUser("----");
            dataSource.setPassword("----");
            dataSource.setServerName("----");

            Connection conn = dataSource.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM eng_words WHERE word='prodigy'");


            while(rs.next()){
                int id = rs.getInt("id");
                String word = rs.getString("word");
                String first_char = rs.getString("first_char");

                System.out.format("%d, %s, %s\n", id, word, first_char);

            }
            rs.close();
            stmt.close();
            conn.close();
        }
        catch(Exception e){
            System.err.println(e);
        }
    }
}
