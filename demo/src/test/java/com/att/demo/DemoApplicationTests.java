package com.att.demo;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DemoApplicationTests {
    private WireMockServer wireMockServer;

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    public void setup() {
        wireMockServer = new WireMockServer(WireMockConfiguration.wireMockConfig().port(8089));
        wireMockServer.start();
        WireMock.configureFor("localhost", wireMockServer.port());

        wireMockServer.stubFor(get(urlEqualTo("/employees/au4912"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody("{\"id\":\"au4912\",\"firstName\":\"Arya\",\"lastName\":\"Umesh\",\"department\":\"BTPD\",\"position\":\"Intern\",\"salary\":50000}")
                        .withStatus(200)));

        wireMockServer.stubFor(get(urlEqualTo("/employees"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")
                        .withBody("[{\"id\":\"au4912\",\"firstName\":\"Arya\",\"lastName\":\"Umesh\",\"department\":\"BTPD\",\"position\":\"Intern\",\"salary\": 50000},{\"id\":\"au4567\",\"firstName\":\"Aurum\",\"lastName\":\"Santosh\",\"department\":\"CIO\",\"position\":\"Full Time Employee\",\"salary\":55000}]")
                        .withStatus(200)));

        wireMockServer.stubFor(post(urlEqualTo("/employees"))
                .willReturn(aResponse()
                        .withStatus(200)));

        wireMockServer.stubFor(put(urlEqualTo("/employees/au4567"))
                .willReturn(aResponse()
                        .withStatus(200)));

        wireMockServer.stubFor(delete(urlEqualTo("/employees/au4912"))
                .willReturn(aResponse()
                        .withStatus(204)));
    }

    @Test
    @Order(1)
    public void testCreateEmployee() {
        String newEmployeeJson = "{\"id\":\"gw4364\",\"firstName\":\"Ganwah\",\"lastName\":\"Hegde\",\"department\":\"HR\",\"position\":\"Manager\",\"salary\":60000}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(newEmployeeJson, headers);

        ResponseEntity<Void> response = restTemplate.postForEntity("/employees", request, Void.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        //assertEquals("/employees/gw4364", response.getHeaders().getLocation().getPath());

        //ResponseEntity<Void> response = restTemplate.postForEntity("/employees", null, Void.class);
        //assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    @Order(2)
    public void testGetSingleEmployee() {
        ResponseEntity<String> response = restTemplate.getForEntity("/employees/au4912", String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("{\"id\":\"au4912\",\"firstName\":\"Arya\",\"lastName\":\"Umesh\",\"department\":\"BTPD\",\"position\":\"Intern\",\"salary\":50000}", response.getBody());
    }

    @Test
    @Order(3)
    public void testGetAllEmployees() {
        ResponseEntity<String> response = restTemplate.getForEntity("/employees", String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("[{\"id\":\"au4912\",\"firstName\":\"Arya\",\"lastName\":\"Umesh\",\"department\":\"BTPD\",\"position\":\"Intern\",\"salary\":50000},{\"id\":\"au4567\",\"firstName\":\"Aurum\",\"lastName\":\"Santosh\",\"department\":\"CIO\",\"position\":\"Full Time Employee\",\"salary\":55000},{\"id\":\"gw4364\",\"firstName\":\"Ganwah\",\"lastName\":\"Hegde\",\"department\":\"HR\",\"position\":\"Manager\",\"salary\":60000}]", response.getBody());
    }

    @Test
    @Order(4)
    public void testUpdateEmployee() {
        String updatedEmployeeJson = "{\"id\":\"au4912\",\"firstName\":\"Arya\",\"lastName\":\"Umesh\",\"department\":\"BTPD\",\"position\":\"Intern\",\"salary\":49620}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(updatedEmployeeJson, headers);

        ResponseEntity<Void> response = restTemplate.exchange("/employees/au4912", HttpMethod.PUT, request, Void.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Optionally, you can verify the updated resource by performing a GET request
        ResponseEntity<String> getResponse = restTemplate.getForEntity("/employees/au4912", String.class);
        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertEquals(updatedEmployeeJson, getResponse.getBody());

        //restTemplate.put("/employees/au4567", null);
        //ResponseEntity<String> response = restTemplate.getForEntity("/employees/au4567", String.class);
        //assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    @Order(5)
    public void testDeleteResource() {
        restTemplate.delete("/employees/au4567");

        ResponseEntity<String> response = restTemplate.getForEntity("/employees/au4567", String.class);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @AfterEach
    public void tearDown() {
        wireMockServer.stop();
    }
}
